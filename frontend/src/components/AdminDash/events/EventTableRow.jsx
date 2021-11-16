import React, { useState, useEffect } from 'react';
import * as Table from '../shared/tableStyles';
import { Icon } from 'components/Shared';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { fetchVolunteer } from '../queries';

const Styled = {
  Button: styled(Button)`
    background: white;
    border: none;
  `
};

const EventTableRow = ({ event, onEditClicked, onDeleteClicked }) => {
  const [showVolunteers, setShowVolunteers] = useState(false);
  const [currentVolunteers, setCurrentVolunteers] = useState([]);

  const handleDropdownClick = () => {
    setShowVolunteers(!showVolunteers);

    event.volunteers.forEach(volunteer => {
      if (volunteer) {
        fetchVolunteer(volunteer)
          .then(result => {
            if (result && result.data && result.data.user) {
              setCurrentVolunteers(currentVolunteers => [...currentVolunteers, result.data.user]);
            }
          })
          .finally(() => {});
      }
    });
  };

  return (
    <Table.Row key={event._id}>
      <td>
        <Styled.Button onClick={handleDropdownClick}>
          <Icon color="grey3" name={showVolunteers ? 'dropdown-arrow' : 'right-chevron'} />
        </Styled.Button>
      </td>
      <td>{event.name}</td>
      <td>{event.date}</td>
      <td>{event.location}</td>
      <td>
        {event.external_links && event.external_links.length ? (
          <a href={event.external_links[0]} target="_blank" rel="noopener noreferrer">
            {event.external_links[0]}
          </a>
        ) : (
          'N/A'
        )}
      </td>
      <td>{event.volunteers.length + ' / ' + event.max_volunteers}</td>
      {showVolunteers &&
        currentVolunteers.map((volunteer, idx) => (
          <td>
            <td> {volunteer.bio.first_name}</td>
            <td> {volunteer.bio.last_name}</td>
          </td>
        ))}
      <td>
        <Styled.Button onClick={() => onEditClicked(event)}>
          <Icon color="grey3" name="create" />
        </Styled.Button>
      </td>
      <td>
        <Styled.Button onClick={() => onDeleteClicked(event)}>
          <Icon color="grey3" name="delete" />
        </Styled.Button>
      </td>
    </Table.Row>
  );
};

export default EventTableRow;