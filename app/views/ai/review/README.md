Used to check correctness or adapt AI outputs which will be then used by another automated process, eg. search

<div><img src="/public/images/cps/reviewAdapt1.png" alt="Example review and adapt summary " style="width:100%;height:auto"></div>
<div><img src="/public/images/cps/reviewAdapt2.png" alt="Example from the legal and policy use case" style="width:100%;height:auto"></div>

## Where

During a task, once the AI outputs have been generated

## Mindful friction could help

- Opportunity to review correctness
- Check with the user what’s relevant and what isn’t
- Invite the user to add what AI may have missed
- Provide implicit feedback on AI-generated outputs

## Risks this pattern could mitigate

- Failure of AI to handle factual info correctly
- Automation complacency
- Skills fade
- Shifts in real and perceived responsibility

## Don’ts

- Use this pattern unless the reviewed outputs will be used by another automated process- Overload the pattern with content, it needs to be easily skimmed


## Needs testing

- How to split generated content into chunks small enough to be easy to review, but at the same time avoid user overload
- Governance processes for handling feedback on AI outputs, eg. to decide when there are org level model changes to be made