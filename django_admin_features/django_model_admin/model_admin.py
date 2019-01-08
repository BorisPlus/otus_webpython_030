from django.contrib import admin
from django.contrib.admin.widgets import AdminURLFieldWidget
from django.contrib.admin.views.main import ChangeList, ORDER_VAR


class ImageWidget(AdminURLFieldWidget):
    template_name = 'admin/widgets/img.html'


class ImagedModelAdmin(admin.ModelAdmin):
    image_fields = []

    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name in self.image_fields:
            request = kwargs.pop("request", None)
            kwargs['widget'] = ImageWidget
            return db_field.formfield(**kwargs)
        return super(ImagedModelAdmin, self).formfield_for_dbfield(db_field, **kwargs)


class MultiFieldSortableChangeList(ChangeList):
    def get_ordering(self, request, queryset):
        params = self.params
        ordering = list(self.model_admin.get_ordering(request)
                        or self._get_default_ordering())
        if ORDER_VAR in params:
            ordering = []
            order_params = params[ORDER_VAR].split('.')
            for p in order_params:
                try:
                    none, pfx, idx = p.rpartition('-')
                    field_name = self.list_display[int(idx)]

                    order_fields = self.get_ordering_field(field_name)
                    order_fields = order_fields if isinstance(order_fields, str) else set(order_fields)

                    if isinstance(order_fields, str):
                        order_fields = [order_fields]
                    for order_field in order_fields:
                        if order_field:
                            ordering.append(pfx + order_field)
                except (IndexError, ValueError):
                    continue  # Invalid ordering specified, skip it.

        ordering.extend(queryset.query.order_by)
        pk_name = self.lookup_opts.pk.name
        if not (set(ordering) & set(['pk', '-pk', pk_name, '-' + pk_name])):
            ordering.append('-pk')

        return ordering


class ExtendedModelAdmin(ImagedModelAdmin):
    def get_changelist(self, request, **kwargs):
        return MultiFieldSortableChangeList
