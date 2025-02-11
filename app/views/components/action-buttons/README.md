The button menu is a versatile component that allows users to view tasks as buttons in a collapsible menu.

<!-- {{ dsExample({
  name: 'action-buttons',
  example: 'default',
  height: 300
}) }} -->

Use the button menu to display multiple actions to a user. They open it with the menu title button.

This component is based on the [MOJ Design System button menu](https://design-patterns.service.justice.gov.uk/components/button-menu/). 


<div><img src="/public/images/cps/action-button-2.png" alt="image of the action button unopened" style="width:300px;height:auto"></div>
<div><img src="/public/images/cps/action-button-1.png" alt="image of the action button open showing the options available" style="width:300px;height:auto"></div>

CPS has a variation that is used in a table row where the user needs to see a preview of a document as well as the actions associated with that document.
<div><img src="/public/images/cps/action-button-3.png" alt="image of the action button open showing the options available" style="width:100%;height:auto"></div>
<div><img src="/public/images/cps/action-button-4.png" alt="image of the action button open showing the options available" style="width:100%;height:auto"></div>
<div><img src="/public/images/cps/action-button-5.png" alt="image of the action button open showing the options available" style="width:100%;height:auto"></div>



## When to use this component

To show multiple tasks to users, start with the GOV.UK Design System button group. This helps users to find what they need.

Consider the action button menu instead if the buttons:

- have long titles or there’s a lack of space to display them, for example in a complex interface
- are variations on a theme, for example ‘Print options’
- are for fairly unrelated tasks, for example ‘Actions’
- are lower priority and do not need visual prominence
- need to change in number, for example with new functionality or according to permissions

## When not to use this component

Do not use the button menu:

- as navigation or to link to a page for the sole purpose of viewing it, for example a booking (this is an accessibility issue and counts as a WCAG failure)
- to display options like on a GOV.UK Design System question page - list them as bullets
- for warning or inactive (disabled) buttons



## Research on this component

This component has been tested in prototypes of several internal products, including:

- work management
- housekeeping

