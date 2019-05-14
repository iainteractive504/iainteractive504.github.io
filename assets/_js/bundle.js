import {loader} from './loader';
import {onInit} from './init';

$(window).on('load', function () {
  // SMOOTH PAGE LOAD
  $('body').removeClass('fade-out');
  loader().then(() => {
    onInit();
  }, 200);
});
