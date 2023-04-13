import React from "react";
import styled from "styled-components";

function InputField({ type, id, content, onChange }) {
  return (
    <Container>
      <input type={type} name={id} id={id} required autoComplete="off" onChange={(e) => onChange(e.target.value)} />
      <label htmlFor={id}>
        <span>{content}</span>
      </label>
    </Container>
  );
}

export default InputField;

const Container = styled.div`
  width: 100%;
  position: relative;
  height: max-content;
  overflow: hidden;

  input {
    width: 100%;
    height: 50px;
    border: none;
    background-color: transparent;
    outline: none;
    padding-top: 30px;
    font-size: 1rem;

    &:is(:focus, :valid) {
      & + label {
        &:after {
          right: 0%;
        }

        span {
          bottom: 25px;
          font-size: 0.6rem;
          font-weight: 600;
        }
      }
    }
  }

  label {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    border-bottom: 1px solid gray;
    pointer-events: none;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 100%;
      bottom: 1px;
      border-bottom: 2px solid black;
      transition: all 0.3s ease;
    }

    span {
      position: absolute;
      bottom: 0;
      font-size: 1rem;
      color: gray;
      transition: all 0.3s ease;
    }
  }
`;
