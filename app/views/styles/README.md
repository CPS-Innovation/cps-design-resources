# Styles

Make your service look and feel like CPS.

We use patterns from existing design systems in this order:

- [CPS Outsystems Style Guide](https://cps-dev.outsystemsenterprise.com/Casework_StyleGuide/UIPatterns)
- CPS Design System for design patterns - This pattern library for patterns that are not yet in the Outsystems style guide
- [GDS Design System](https://design-system.service.gov.uk/)
- [Ministry of Justice Design System](https://design-patterns.service.justice.gov.uk/)
- [Home Office Design System](https://design.homeoffice.gov.uk/)
- [Full list of Gov design systems and services](https://x-govuk.github.io//)


If you are using [Ministry of Justice Frontend](https://design-patterns.service.justice.gov.uk/) in your build or prototype, the MOJ coded examples in the MOJ Design System won’t need any additional styling.

If you are using [Home Office Frontend](https://design.homeoffice.gov.uk/get-started) in your build or prototype, the Home Office coded examples in the Home Office Design System won’t need any additional styling.

If you need to apply styles manually, you should still follow existing CPS conventions. For example, don’t assign new meanings to colours, don’t change the style of buttons or adjust the thickness of borders on form inputs.


# Grids
Use the [GDS grid and layouts](https://design-system.service.gov.uk/styles/layout/) as a foundation, but adjust for a maximum screen width of 1600px (t.b.c).


# Fonts

CPS has licenced the font [NewTransport](http://www.newtransport.co.uk/). It is the font that the GDS Transport font is based on. It is very similar to the original GDS font, when used it tends to take up slightly more horizontal space than the GDS font but is close enough that it is hard to distinguish between the two.

Ask the design lead for a copy of the fonts for your prototype. For Figma continue to use the GDS Transport font for now.

# Type scale

 We use the [GDS type scale](https://design-system.service.gov.uk/styles/type-scale/) with a minimum of 16px font size



# Screen size
T.B.C

Minimum Screen Width: 1024px (t.b.c)
- the smallest supported screen size is 1024px, ensuring usability on lower-resolution or compact displays, scaled screens or small external monitors.
- at this width, interfaces should remain fully functional, avoiding horizontal scrolling while maintaining readability and accessibility.
- navigation should use the [priority pattern](https://jayfreestone.github.io/priority-plus/) to show as many navigation options as possible

Most Common Screen Width: 1400px (t.b.c) 
- the majority of users operate on screens around 1400px wide, which is the optimal design target for layout and spacing.
- primary navigation, content organization, and interactive elements should be optimized for this width, ensuring an efficient and intuitive user experience.

Maximum Screen Width: 1600px (t.b.c)
- the main container including gutters has a max width of 1600px
- the largest expected screen width is 1600px, typically found on high-resolution monitors used in office and home offices.
- while designs should accommodate this size, layouts should not overly stretch beyond usability

Responsive Considerations
- the interface should fluidly scale between 1024px and 1600px while maintaining logical content distribution and avoiding excessive whitespace.
- components should adapt to wider screens without unnecessary expansion
- where applicable, consider providing multi-column layouts or side panels that take advantage of additional screen real estate at larger widths