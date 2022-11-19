import * as tuitsDao from "../tuits/tuits-dao.js";
/*import posts from "./tuits.js";
let tuits = posts;*/

const TuitsController = (app) => {
  app.get('/api/tuits', findTuit);
  app.post('/api/tuits', createTuit);
  app.delete('/api/tuits/:tid', deleteTuit);
  app.put('/api/tuits/:tid', updateTuit);
}

const findTuit = async (req, res) => {
  const tuits = await tuitsDao.findTuits()
  res.json(tuits);
  /*res.send(tuits)*/
  /*setTimeout(() => res.send(tuits), 2000);*/
}

const createTuit = async (req, res) => {
  const newTuit = req.body;
  /*newTuit._id = (new Date()).getTime() + '';*/
  newTuit.likes = 0;
  newTuit.liked = false;
  /*tuits.push(newTuit);*/
  const insertedTuit = await tuitsDao.createTuit(newTuit)
  res.send(insertedTuit);
}

const deleteTuit = async (req, res) => {
  const tuitIdToDelete = req.params['tid'];
  const status = await tuitsDao.deleteTuit(tuitIdToDelete);
  /*tuits = tuits.filter(t => t._id !== tuitIdToDelete);*/
  /*res.sendStatus(200);*/
  res.json(status);
}

const updateTuit = async (req, res) => {
  const updates = req.body;
  const tuitIdToUpdate = req.params['tid'];
 /* const tuitIndex = tuits.findIndex(t => t._id === tid)
  if (tuitIndex >= 0) {
    tuits[tuitIndex] ={
      ...tuits[tuitIndex],
      ...tuitUpdates
    }
    res.send(tuits[tuitIndex])
  } else {
    res.sendStatus(404);
  }*/
  const status = await tuitsDao.updateTuit(tuitIdToUpdate,updates);
  res.json(status);
}

export default TuitsController;