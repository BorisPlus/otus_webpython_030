from django.utils.html import mark_safe, format_html_join, escape
from .helper.attrs import fill_clever_attributes_dict


# <A ...>...</A>
def a(**kwargs):
    def decorator(decorate_me):
        def wrapper(self, obj):
            tag_attributes = fill_clever_attributes_dict(self, obj, **kwargs)

            if 'href' not in tag_attributes and decorate_me(self, obj):
                tag_attributes['href'] = decorate_me(self, obj)
            if 'text' not in tag_attributes:
                tag_attributes['text'] = decorate_me(self, obj) or ''
            return mark_safe(
                '<a {attrs}>{text}</a>'.format(
                    attrs=' '.join('{}="{}"'.format(k, escape(tag_attributes.get(k))) for k in tag_attributes),
                    text=tag_attributes.get('text'),
                )
            )

        return wrapper

    return decorator


#
def abbr(**kwargs):
    def decorator(decorate_me):
        def wrapper(self, obj):
            tag_attributes = fill_clever_attributes_dict(self, obj, **kwargs)

            if 'title' not in tag_attributes:
                tag_attributes['title'] = decorate_me(self, obj) or ''

            return mark_safe(
                '<abbr {attrs}>{short}</abbr>'.format(
                    attrs=' '.join('{}="{}"'.format(k, escape(tag_attributes.get(k))) for k in tag_attributes),
                    short='%s...' % decorate_me(self, obj)[:10] if decorate_me(self, obj) else '',
                )
            )

        return wrapper

    return decorator


# <font ...>...</font>
def fail_on_empty(**kwargs):
    def decorator(decorate_me):
        def wrapper(self, obj):
            if decorate_me(self, obj):
                return decorate_me(self, obj)
            return mark_safe('<img src="%s">' % '/static/admin/img/icon-no.svg')

        return wrapper

    return decorator


# <IMG ... />
def img(**kwargs):
    def decorator(decorate_me):
        def wrapper(self, obj):

            tag_attributes = fill_clever_attributes_dict(self, obj, **kwargs)
            if 'width' not in tag_attributes and decorate_me(self, obj):
                tag_attributes['width'] = "150"
            if 'src' not in tag_attributes:
                tag_attributes['src'] = decorate_me(self, obj) or ''
            return mark_safe(
                '<img {attrs}>'.format(
                    attrs=' '.join('{}="{}"'.format(k, escape(tag_attributes.get(k))) for k in tag_attributes),
                )
            )

        return wrapper

    return decorator


def ul_li(row_format=None, separator=''):
    def decorator(decorate_me):
        def wrapper(self, obj):
            rows = []
            result_row_format = row_format
            for item in decorate_me(self, obj):
                row = []
                for cell in item:
                    row.append(escape(cell))
                rows.append(tuple(row))
                if result_row_format is None:
                    result_row_format = ' '.join(['{}'] * len(row))
            result_row_format = '<li>{}</li>'.format(result_row_format)
            li_data = format_html_join(
                mark_safe(separator),
                result_row_format,
                tuple(rows),
            )
            return mark_safe(
                '<ul>{}</ul>'.format(
                    li_data
                )
            ) if li_data else ''

        return wrapper

    return decorator


# put any list of tuples to html separated rows
def separated_list(row_format=None, separator='<br>'):
    def decorator(decorate_me):
        def wrapper(self, obj):
            rows = []
            result_row_format = row_format
            for item in decorate_me(self, obj):
                row = []
                for cell in item:
                    row.append(escape(cell))
                rows.append(tuple(row))
                if result_row_format is None:
                    result_row_format = ' '.join(['{}'] * len(row))
            return format_html_join(
                mark_safe(separator),
                result_row_format,
                tuple(rows),
            )

        return wrapper

    return decorator


# <A ...>...</A>
def button(**kwargs):
    def decorator(decorate_me):
        def wrapper(self, obj):
            tag_attributes = fill_clever_attributes_dict(self, obj, **kwargs)

            if 'href' not in tag_attributes and decorate_me(self, obj):
                tag_attributes['href'] = decorate_me(self, obj)
            if 'text' not in tag_attributes:
                tag_attributes['text'] = decorate_me(self, obj) or ''
            return mark_safe(
                '<a><button>{value}</button></a>{text}'.format(
                    attrs=' '.join('{}="{}"'.format(k, escape(tag_attributes.get(k))) for k in tag_attributes),
                    value=tag_attributes.get('value') or '+',
                    text='<br>%s' % decorate_me(self, obj) if decorate_me(self, obj) else'',
                )
            )

        return wrapper

    return decorator
