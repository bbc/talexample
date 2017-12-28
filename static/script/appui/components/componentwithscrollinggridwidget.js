define(
  'sampleapp/appui/components/componentwithscrollinggridwidget',
  [
    'antie/widgets/component',
    'sampleapp/appui/components/scrollinggridwidget'
  ],
  function (Component, ScrollingGrid) {
    return Component.extend({
      init: function init () {
        init.base.call(this, 'carouselComponent')

        this.addEventListener('select', this.onSelect.bind(this))
        this.addEventListener('beforeshow', this.onBeforeShow.bind(this))
        this.addEventListener('afterhide', this.onAfterHide.bind(this))
      },

      onBeforeShow: function onBeforeShow () {
        this.appendChildWidget(new ScrollingGrid())
      },

      onSelect: function (evt) {
        this.parentWidget.back()
      },

      onAfterHide: function (evt) {
        this.removeChildWidgets()
      }
    })
  }
)
