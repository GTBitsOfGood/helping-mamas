import { useSession } from "next-auth/react";
import Error from "next/error";
import React, { Component } from "react";
import { Button } from "reactstrap";
import styled from "styled-components";
import {
  fetchMoreApplicants,
  filterApplicants,
  searchApplicants,
} from "../../actions/queries";
import Icon from "../../components/Icon";
import InfiniteScroll from "../../components/InfiniteScroll";
import Loading from "../../components/Loading";
import ApplicantInfo from "./ApplicantInfo";
import ApplicantList from "./ApplicantList";
import ApplicantSearch from "./ApplicantSearch";

const Styled = {
  Container: styled.div`
    background: white;
    height: 100%;
    width: 100%;
  `,
  Main: styled.div`
    display: flex;
    height: 100%;
  `,
  ApplicantInfoContainer: styled.div`
    flex: 1;
    background: #f6f6f6;
    overflow-y: scroll;
    padding: 1rem;

    ${(props) =>
      props.loading &&
      `
      display: flex;
      justify-content: center;
      align-items: center;
    `}
  `,
  SecondaryOptions: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1rem;

    span {
      margin-left: 0.5rem;
    }
  `,
  Button: styled(Button)`
    background: gainsboro;
    border: none;
    &:hover {
      background: lightgray;
    }
    &:focus {
      background: gainsboro;
      box-shadow: none;
    }
  `,
};

function authWrapper(Component) {
  return function WrappedComponent(props) {
    const {
      data: { user },
    } = useSession();
    if (user.role !== "admin") {
      return (
        <Error
          title="You are not authorized to access this page"
          statusCode={403}
        />
      );
    } else {
      return <Component {...props} user={user} />;
    }
  };
}

class AdminDash extends Component {
  constructor() {
    super();
    this.state = {
      selectedApplicantIndex: 0,
      applicants: [],
    };
  }

  onSelectApplicant = (index) => {
    this.setState({
      selectedApplicantIndex: index,
    });
  };

  onRefreshApplicants = () => {
    this.setState(
      {
        isLoading: true,
        applicants: [],
      },
      this.onLoadMoreApplicants
    );
  };

  onLoadMoreApplicants = () => {
    this.setState({
      isLoading: true,
    });

    const { applicants } = this.state;
    const lastPaginationId = applicants.length
      ? applicants[applicants.length - 1]._id
      : 0;
    console.log(lastPaginationId);

    fetchMoreApplicants(lastPaginationId).then((res) =>
      this.setState({
        applicants: [...this.state.applicants, ...res.data.users],
        isLoading: false,
      })
    );
  };
  onUpdateApplicantStatus = (applicantEmail, updatedStatus) => {
    this.setState({
      applicants: this.state.applicants.map((applicant) => {
        if (applicant.bio.email === applicantEmail)
          return { ...applicant, status: updatedStatus };
        return applicant;
      }),
    });
  };
  onUpdateApplicantRole = (applicantEmail, updatedRole) => {
    this.setState({
      applicants: this.state.applicants.map((applicant) => {
        if (applicant.bio.email === applicantEmail)
          return { ...applicant, role: updatedRole };
        return applicant;
      }),
    });
  };

  onSearchSubmit = (textInput, type) => {
    searchApplicants(textInput, type).then((response) =>
      this.setState({
        applicants: response.data.users,
      })
    );
  };

  onApplyFilters = (filters) => {
    filterApplicants(filters).then((response) =>
      this.setState({
        applicants: response.data.users,
      })
    );
  };
  render() {
    const { isLoading, applicants, selectedApplicantIndex } = this.state;

    return (
      <Styled.Container>
        <Styled.Main>
          <InfiniteScroll
            loadCallback={this.onLoadMoreApplicants}
            isLoading={isLoading}
          >
            <ApplicantList
              applicants={applicants}
              selectApplicantCallback={this.onSelectApplicant}
              selectedIndex={selectedApplicantIndex}
            >
              <ApplicantSearch
                searchSubmitCallback={this.onSearchSubmit}
                applyFiltersCallback={this.onApplyFilters}
              />
              <Styled.SecondaryOptions>
                <Styled.Button onClick={this.onRefreshApplicants}>
                  <Icon color="grey3" name="refresh" />
                  <span style={{ color: "black" }}>Refresh</span>
                </Styled.Button>
              </Styled.SecondaryOptions>
            </ApplicantList>
          </InfiniteScroll>
          <Styled.ApplicantInfoContainer
            loading={!applicants || !applicants.length}
          >
            {applicants && applicants.length ? (
              <ApplicantInfo
                applicant={applicants[selectedApplicantIndex]}
                updateStatusCallback={this.onUpdateApplicantStatus}
                updateRoleCallback={this.onUpdateApplicantRole}
              />
            ) : (
              <Loading />
            )}
          </Styled.ApplicantInfoContainer>
        </Styled.Main>
      </Styled.Container>
    );
  }
}

export default authWrapper(AdminDash);
