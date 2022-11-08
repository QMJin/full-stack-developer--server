import posts from "./tuits.js";
let tuits = posts;

const TuitsController = (app) => {
  app.get('/api/tuits', findTuit);
  app.post('/api/tuits', createTuit);
  app.delete('/api/tuits/:tid', deleteTuit);
  app.put('/api/tuits/:tid', updateTuit);
}

const findTuit = (req, res) => {
  res.send(tuits)
  /*setTimeout(() => res.send(tuits), 2000);*/
}

const createTuit = (req, res) => {
  const newTuit = req.body;
  newTuit._id = (new Date()).getTime() + '';
  newTuit.likes = 0;
  tuits.push(newTuit);
  res.send(newTuit);
}

const deleteTuit = (req, res) => {
  const tuitIdToDelete = req.params['tid'];
  tuits = tuits.filter(t => t._id !== tuitIdToDelete);
  res.sendStatus(200);
}

const updateTuit = (req, res) => {
  const tuitUpdates = req.body;
  const tid = req.params['tid'];
  const tuitIndex = tuits.findIndex(t => t._id === tid)
  if (tuitIndex >= 0) {
    tuits[tuitIndex] ={
      ...tuits[tuitIndex],
      ...tuitUpdates
    }
    res.send(tuits[tuitIndex])
  } else {
    res.sendStatus(404);
  }
}

export default TuitsController;