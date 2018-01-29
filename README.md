# djedr.github.io

This is a repository for my home page.

# Note about contributing to ./posts/raw/ here

If you want to add or modify anything more than text (e.g. typos), for example add a link or any other markup, there is one thing you need to know:

_The format here is not Markdown. It's my custom little language, which "compiles" to HTML._

The basic structure (for now) is:
```
[tag-name[
    attribute-name-1[attribute value 1]
    attribute-name-2[attribute value 2]
]
    tag content/children
]
```

This compiles to:
```html
<tag-name
    attribute-name-1="attribute value 1"
    attribute-name-2="attribute value 2"
>
    tag content/children
</tag-name>
```

There are some additional features, but not important for basic usage and subject to change. I will also extend the language with more advanced features later. I may publish the source code and documentation for the "compiler" if I find the time to make the code readable and documented.

Anyway to make a link there you'd do:
```
[a[href[https://github.com/djedr/djedr.github.io]]here]
```

This would be compiled to:
```html
<a href="https://github.com/djedr/djedr.github.io">here</a>
```

You can also use regular HTML or just write plain text, which I can manually adjust to proper format. Now that I think of it, I can probably add markdown support inside `[markdown[]]` "tags".

It's all so weird because I'm experimenting, playing, having fun here.