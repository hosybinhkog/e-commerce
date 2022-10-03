import React, { useRef } from "react";

const clickOutsideRef = (
  content_ref: React.MutableRefObject<HTMLElement>,
  toggle_ref: React.MutableRefObject<HTMLElement>
) => {
  document.addEventListener("mousedown", (e) => {
    if (toggle_ref.current && toggle_ref.current.contains(e.target as Node)) {
      content_ref.current.classList.toggle("active");
    } else {
      if (
        content_ref.current &&
        !content_ref.current.contains(e.target as Node)
      ) {
        content_ref.current.classList.remove("active");
      }
    }
  });
};

const Dropdown: React.FC<any> = (props: any) => {
  const dropdown_toggle_el = useRef<HTMLButtonElement>(null);
  const dropdown_content_el = useRef<HTMLDivElement>(null);
  clickOutsideRef(dropdown_content_el, dropdown_toggle_el);

  const Icon = props.icon;

  return (
    <div className='dropdown'>
      <button ref={dropdown_toggle_el} className='dropdown__toggle'>
        {props.icon ? <Icon /> : ""}
        {props.badge ? (
          <span className='dropdown__toggle-badge'>{props.badge}</span>
        ) : (
          ""
        )}
        {props.customToggle ? props.customToggle() : ""}
      </button>
      <div ref={dropdown_content_el} className='dropdown__content'>
        {props.contentData && props.renderItems
          ? props.contentData.map((item, index) =>
              props.renderItems(item, index)
            )
          : ""}
        {props.renderFooter ? (
          <div className='dropdown__footer'>{props.renderFooter()}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Dropdown;
