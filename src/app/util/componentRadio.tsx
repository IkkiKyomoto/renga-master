"use client";

import React from "react";

export function ComponentRadioWrapper({
  children,
  legend,
}: {
  children: React.ReactNode;
  legend: string;
}) {
  return (
    <div>
      <fieldset>
        {legend && <legend>{legend}</legend>}
        {children}
      </fieldset>
    </div>
  );
}

export function ComponentRadio({
  children,
  id,
  name = "radio",
}: {
  children: React.ReactNode;
  id: string;
  name?: string;
}) {
  return (
    <div>
      <input type="radio" id={id} name={name} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
