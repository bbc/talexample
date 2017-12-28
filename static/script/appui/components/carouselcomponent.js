define(
  'sampleapp/appui/components/carouselcomponent',
  [
    'antie/widgets/component',
    'antie/datasource',
    'antie/widgets/label',
    'antie/widgets/carousel',
    'antie/widgets/carousel/binder',
    'antie/widgets/carousel/keyhandlers/activatefirsthandler',
    'antie/widgets/carousel/strips/cullingstrip'
  ],
  function (Component, DataSource, Label, Carousel, Binder, ActivateFirstHandler,
    CullingStrip) {
    'use strict'

    return Component.extend({
      init: function init () {
        init.base.call(this, 'carouselComponent')

        this.addEventListener('beforeshow', this.onBeforeShow.bind(this))
        this.addEventListener('afterhide', this.onAfterHide.bind(this))
        this.addEventListener('select', this.onSelect.bind(this))

        this._description = new Label()
        this._description.addClass('description')
        this.appendChildWidget(this._description)
      },

      onBeforeShow: function (evt) {
        // the arg object passed into component.show comes through like so
        var args = evt.args

        this._initialItem = args.initialItem
        this._description.setText(args.description)
        this._lengths = args.lengths

        this._carousel = new Carousel(args.carouselId, args.orientation)
        this._carousel.setWidgetStrip(CullingStrip)
        this._attachCarouselHandler(args.animOptions)

        this.appendChildWidget(this._carousel)
        this._carousel.addEventListener('databound', this.onDataBound.bind(this))

        this._carousel.setNormalisedAlignPoint(args.alignment.normalisedAlignPoint)
        this._carousel.setNormalisedWidgetAlignPoint(args.alignment.normalisedWidgetAlignPoint)

        var binder = new Binder(args.formatter, args.dataSource)
        binder.appendAllTo(this._carousel)
      },

      onAfterHide: function (evt) {
        this._carousel.completeAlignment()
        this.removeChildWidget(this._carousel)
        this._carousel = null
      },

      onSelect: function (evt) {
        this.parentWidget.back()
      },

      onDataBound: function (evt) {
        // In practice you might set widget lengths from data source rather then component args
        // and do it during a bind per widget (on append), however if you're doing it in a block
        // this is where it needs to happen (post bind, pre align)
        if (this._lengths) {
          this._carousel.setWidgetLengths(this._lengths)
        }

        // could also set initial/aligned item from data source
        this._carousel.alignToIndex(this._initialItem)
        this._carousel.setActiveChildIndex(this._initialItem)
        this._carousel.getChildWidgets()[this._initialItem].focus()
        this.show({})
      },

      _attachCarouselHandler: function (animOptions) {
        var handler = new ActivateFirstHandler()
        handler.setAnimationOptions(animOptions)
        handler.attach(this._carousel)
      }
    })
  }
)
