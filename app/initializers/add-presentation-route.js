import Router from '../router';

export default {
  name: 'add-presentation-routes',
  initialize: function() {
    Router.map(function() {
      this.route('presentation', {path: '/', resetNamespace: true}, function () {
        this.route('slide', {path: '/:id', resetNamespace: true});
      });
    });
  }
};
