/**
 * Scrollinggrid and scrollinggridwidget are showing the difference between
 * creating your own component (scrolling grid) and creating your own
 * widget (scrollinggridwidget)
 *
 * The main differences being that with a component, you should handle the creation
 * and removal of children in the lifecycle events, but with a widget, you can
 * assume that that is being dealt with by a parent, and as such only need to
 * deal with the creation of any children in the initialiazation.
 *
 */

define(
  'sampleapp/appui/components/scrollinggrid',
  [
    'antie/widgets/component',
    'antie/widgets/carousel',
    'antie/widgets/carousel/binder',
    'antie/widgets/carousel/keyhandlers/activatefirsthandler',
    'sampleapp/appui/formatters/scrollinggridrowformatter',
    'sampleapp/appui/datasources/fruitdata'
  ],
  function (Component, Carousel, Binder, ActivateFirstHandler, ScrollingGridRowFormatter, FruitData) {
    return Component.extend({
      init: function init () {
        init.base.call(this, 'scrollingGridWidget')

        this.addEventListener('select', this.onSelect.bind(this))
        this.addEventListener('beforeshow', this.onBeforeShow.bind(this))
        this.addEventListener('afterhide', this.onAfterHide.bind(this))
      },

      onBeforeShow: function onBeforeShow (evt) {
        // children should be created in the lifecycle events (in this case beforeshow)
        this._columnCarousel = new Carousel('columnCarouselComponent', Carousel.orientations.VERTICAL)

        // 3 rows of fruit
        var dataSource = [
          {
            id: 'row1',
            feed: FruitData
          },
          {
            id: 'row2',
            feed: FruitData
          },
          {
            id: 'row3',
            feed: FruitData
          }
        ]

        var binder = new Binder(new ScrollingGridRowFormatter(), dataSource)
        binder.appendAllTo(this._columnCarousel)

        var handler = new ActivateFirstHandler()
        handler.setAnimationOptions({skipAnim: false})
        handler.attach(this._columnCarousel)

        this.appendChildWidget(this._columnCarousel)
      },

      onSelect: function onSelect (evt) {
        this.parentWidget.back()
      },

      onAfterHide: function onAfterHide (evt) {
        // children should be cleaned up as well
        this.removeChildWidgets()
        this._columnCarousel = null
      }
    })
  }
)
