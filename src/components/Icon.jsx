import React from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";

const SVG = styled.svg`
  padding: 0.1rem;
  padding-bottom: 0.2rem;
  height: ${(props) => props.size};
  width: ${(props) => props.size};
`;

const iconData = {
  "dropdown-arrow": (
    <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z" />
  ),
  "back-arrow": (
    <path d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z" />
  ),
  "right-chevron": (
    <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z" />
  ),
  "left-chevron": (
    <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
  ),
  create: (
    <path d="M64 368v80h80l235.727-235.729-79.999-79.998L64 368zm377.602-217.602c8.531-8.531 8.531-21.334 0-29.865l-50.135-50.135c-8.531-8.531-21.334-8.531-29.865 0l-39.468 39.469 79.999 79.998 39.469-39.467z" />
  ),
  copy: (
    <React.Fragment>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M124.444 141.128c-15.173 0-27.474 12.245-27.474 27.351v240.684c0 15.104 12.301 27.349 27.474 27.349h175.84c15.172 0 27.473-12.245 27.473-27.349V241.306a27.286 27.286 0 0 0-8.047-19.339l-73.159-72.828a27.536 27.536 0 0 0-19.426-8.011H124.444ZM64 168.479c0-33.232 27.062-60.171 60.444-60.171h102.681c16.03 0 31.405 6.339 42.74 17.623l73.158 72.827a60.035 60.035 0 0 1 17.704 42.548v167.857c0 33.231-27.061 60.17-60.443 60.17h-175.84c-33.382 0-60.444-26.939-60.444-60.17V168.479Z"
        fill="#030D45"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M151.919 59.077c0-9.063 7.381-16.41 16.485-16.41h91.69c16.032 0 31.405 6.339 42.741 17.623l106.127 105.648a60.028 60.028 0 0 1 17.705 42.547v156.917c0 9.062-7.382 16.409-16.485 16.409-9.105 0-16.486-7.347-16.486-16.409V208.485a27.28 27.28 0 0 0-8.047-19.339L279.522 83.498a27.539 27.539 0 0 0-19.428-8.011h-91.69c-9.104 0-16.485-7.347-16.485-16.41Z"
        fill="#030D45"
      />
    </React.Fragment>
  ),
  delete: (
    <path d="M128 405.429C128 428.846 147.198 448 170.667 448h170.667C364.802 448 384 428.846 384 405.429V160H128v245.429zM416 96h-80l-26.785-32H202.786L176 96H96v32h320V96z" />
  ),
  mail: (
    <React.Fragment>
      <path d="M460.6 147.3L353 256.9c-.8.8-.8 2 0 2.8l75.3 80.2c5.1 5.1 5.1 13.3 0 18.4-2.5 2.5-5.9 3.8-9.2 3.8s-6.7-1.3-9.2-3.8l-75-79.9c-.8-.8-2.1-.8-2.9 0L313.7 297c-15.3 15.5-35.6 24.1-57.4 24.2-22.1.1-43.1-9.2-58.6-24.9l-17.6-17.9c-.8-.8-2.1-.8-2.9 0l-75 79.9c-2.5 2.5-5.9 3.8-9.2 3.8s-6.7-1.3-9.2-3.8c-5.1-5.1-5.1-13.3 0-18.4l75.3-80.2c.7-.8.7-2 0-2.8L51.4 147.3c-1.3-1.3-3.4-.4-3.4 1.4V368c0 17.6 14.4 32 32 32h352c17.6 0 32-14.4 32-32V148.7c0-1.8-2.2-2.6-3.4-1.4z" />
      <path d="M256 295.1c14.8 0 28.7-5.8 39.1-16.4L452 119c-5.5-4.4-12.3-7-19.8-7H79.9c-7.5 0-14.4 2.6-19.8 7L217 278.7c10.3 10.5 24.2 16.4 39 16.4z" />
    </React.Fragment>
  ),
  "filter-funnel": (
    <path d="M48 87.2c0 5.8 2 11.4 5.6 15.7l152.2 179.8c3.6 4.3 5.6 9.9 5.6 15.7v107c0 10 5.9 18.8 14.6 22l55 19.8c9.6 3.5 19.6-4.3 19.6-15.3V298.3c0-5.8 2-11.4 5.6-15.7l152.2-179.8c3.6-4.3 5.6-9.9 5.6-15.7 0-12.8-9.6-23.2-21.4-23.2H69.4C57.6 64 48 74.4 48 87.2z" />
  ),
  refresh: (
    <path d="M256 48C141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208S370.4 48 256 48zm112 194h-98l44.8-44.8C300.1 181.8 279.1 172 256 172c-46.2 0-84 37.8-84 84s37.8 84 84 84c34.9 0 65.3-21.2 77.6-52h29.8c-13.9 46.3-56.3 80-107.4 80-62.3 0-112-50.4-112-112s50.4-112 112-112c30.8 0 58.8 12.6 79.1 32.9L368 144v98z" />
  ),
  add: (
    <React.Fragment>
      <path d="M256 48C141.125 48 48 141.125 48 256s93.125 208 208 208 208-93.125 208-208S370.875 48 256 48zm107 229h-86v86h-42v-86h-86v-42h86v-86h42v86h86v42z" />{" "}
    </React.Fragment>
  ),
};

const Icon = ({ name, color, size, theme }) => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill={theme[color] || color}
    size={size || "2rem"}
  >
    {iconData[name] || iconData.mail}
  </SVG>
);

export default withTheme(Icon);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  theme: PropTypes.array,
};
