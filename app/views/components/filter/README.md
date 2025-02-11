We have two filter components:

### Version 1
If there is space on the left hand side of a table/list
<div><img src="/public/images/cps/filter-2.png" alt="image of the action button open showing the options available" style="width:100%;height:auto"></div>


### Version 2 
If a filter can only fit above the table
<div><img src="/public/images/cps/filter-1.png" alt="image of the action button open showing the options available" style="width:100%;height:auto"></div>



## Where is it from

### Version 1
[MOJ filter](https://design-patterns.service.justice.gov.uk/components/filter/) 
The CPS filter is based on the MOJ filter element, the current implementations do not use the selected filters element at the top.



### Version 2 
This is a custom CPS design based on outsystems components. Primarily in work management. <strong>DO NOT</strong> use this pattern without discussing with the design lead.



## How it works

### Version 1
The filter component can consist of any form control like radio buttons, checkboxes, date inputs and text boxes.

Users can select 1 or more filters and submit the form. The page refreshes to show the items that match the filters. The selected filters are also marked at the top of the filter to let users see what they've selected and remove them easily.

Clicking on a selected filter, refreshes the page and removes the filter.

### Version 2

The filter primarily uses a dropdown or type-ahead dropdown to select options from a long list. It also supports a free text search field for URNs. Users can select multiple options from the same element, and the selected filters are displayed below the filter in the grey bar.



## Where is it used

This component is used in:
- work management (v2)
- housekeeping (v1)
- casework app (v1)


