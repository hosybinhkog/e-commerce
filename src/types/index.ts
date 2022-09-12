import React from "react";

export type MouseEvent<T = HTMLButtonElement> = React.MouseEventHandler<T>;

export type ChangeEvent<T = HTMLInputElement> = React.ChangeEventHandler<T>;

export type ClickEvent<T = HTMLButtonElement> = React.MouseEventHandler<T>;

export type KeyDownEvent<T = HTMLInputElement> = React.KeyboardEventHandler<T>;
