The button menu is a versatile component that allows users to view tasks as buttons in a collapsible menu.

<!-- {{ dsExample({
  name: 'action-buttons',
  example: 'default',
  height: 300
}) }} -->

Use the button menu to display multiple actions to a user. They open it with the menu title button.



<div><img src="/public/images/cps/add-another-1.png" alt="image of the action button unopened" style="width:100%;height:auto"></div>
<div><img src="/public/images/cps/add-another-2.png" alt="image of the action button open showing the options available" style="width:100%;height:auto"></div>


## Where is it from

This is from the [MOJ Design System](https://design-patterns.service.justice.gov.uk/components/add-another/)

## When to use this component

Use this component when users need to add similar information a couple of times, such as several names for a single application.

## When not to use this component

Do not use this pattern when users need to add different kinds of information that do not relate to each other.

If users need to add information many times, it may cause performance and validation issues as the page will get very long. In this case, you should use add to a list.

## Accessibility issues
Some people who use assistive technology will find it hard to identify form items that are added. This is because the form labels this component creates are given the same ID when added to the page. A fix for this has been proposed on GitHub. This has been raised in an external audit under Web Content Accessibility Guidelines (WCAG) 2.4.6 Headings and Labels (Level AA). If you use this component without addressing this issue, you must list it in the accessibility statement.

People with low vision have also reported difficulty interacting with the remove button. This is because by default it is aligned to the right of the page away from their main focus.



## Research on this component

This component has been tested in prototypes of several internal products, including:

- Witness expenses


