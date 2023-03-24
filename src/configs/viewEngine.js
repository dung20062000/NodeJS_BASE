import express from 'express';

function configViewEngine(app) {
  app.use(express.static('./src/public'))   // ==> Use CSS file
  app.set('view engine', 'ejs');
  app.set('views', './src/views');
}

export default configViewEngine;
