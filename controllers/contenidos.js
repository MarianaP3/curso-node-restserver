/* eslint-disable camelcase */
const { response, request } = require('express')

const Contenido = require('../models/content')

// GET METHODS
const contentsGet = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.query
  const query = { approved: true }

  const [total, contenidos] = await Promise.all([
    // It runs simultaneously
    Contenido.countDocuments(query)
      .skip(since)
      .limit(limit)
  ])

  res.json({
    total,
    contenidos
  })
}
const getContentsByType = async (req = request, res = response) => {
// Dynamic query fot the type content
  const { limit = 10, since = 0 } = req.query
  const query = { type: req.type }
  // It runs simultaneously
  const [total, contenidos] = await Promise.all([
    Contenido.find(query)
      .skip(since)
      .limit(limit),
    Contenido.countDocuments(query)
  ])
  res.json({
    total,
    contenidos
  })
}
const getContentsByTopic = async (req = request, res = response) => {
  // Dynamic query for the topic content
  const { limit = 10, since = 0 } = req.query
  const query = { topic: req.topic }
  // It runs simultaneously
  const [total, contenidos] = await Promise.all([
    Contenido.find(query)
      .skip(since)
      .limit(limit)
  ])
  res.json({
    total,
    contenidos
  })
}
const getApprovedContents = async (req = request, res = response) => {
  // Query for the approved content
  const { limit = 10, since = 0 } = req.query
  const query = { approved: true }
  // It runs simultaneously
  const [total, contenidos] = await Promise.all([
    Contenido.find(query)
      .skip(since)
      .limit(limit)
  ])
  res.json([
    total,
    contenidos
  ])
}

const getNotApprovedContents = async (req = request, res = response) => {
  // Query for the not approved content
  const { limit = 10, since = 0 } = req.query
  const query = { approved: false }
  // It runs simultaneously
  const [total, contenidos] = await Promise.all([
    Contenido.find(query)
      .skip(since)
      .limit(limit)
  ])
  res.json([
    total,
    contenidos
  ])
}

const getContentHiglight = async (req = request, res = response) => {
  // find a content by their id
  // const { id } = req.params
  const { __id, image, title, content/*, ...resto */ } = req.body

  // extracts a frament of about 50 characters of "content"
  const contentFragment = content.substring(0, 50)

  res.json({
    __id,
    title,
    image,
    content: contentFragment
  })
}

const getContentApprovedBy = async (req = request, res = response) => {
  // Dynamic query for the editor who has approved the content
  const { limit = 10, since = 0 } = req.query
  const query = { approvedBy: req.approved_by }
  // It runs simultaneously
  const [total, contenidos] = await Promise.all([
    Contenido.find(query)
      .skip(since)
      .limit(limit)
  ])
  res.json([
    total,
    contenidos
  ])
}

// AUTHOR PAGE
const getContentApprovedCreatedBy = async (req = request, res = response) => {
  // Query for the author who has created the content
  // Can visualize their content approved
  const { limit = 10, since = 0 } = req.query
  const query = { author: req.author, approved: true }
  // It runs simultaneously
  const [total, contenidos] = await Promise.all([
    Contenido.find(query)
      .skip(since)
      .limit(limit)
  ])
  res.json([
    total,
    contenidos
  ])
}

const getContentToBeApprovedCreatedBy = async (req = request, res = response) => {
  // Dynamic query for the editor who has approved the content
  // An author can visualize the content that has to be checked
  const { limit = 10, since = 0 } = req.query
  const query = { author: req.author, approved: false }
  // It runs simultaneously
  const [total, contenidos] = await Promise.all([
    Contenido.find(query)
      .skip(since)
      .limit(limit)
  ])
  res.json([
    total,
    contenidos
  ])
}

async function contentsPost (req, res = response) {
  const {
    title,
    content,
    image,
    link,
    topic,
    type,
    approved,
    approved_by,
    author

  } = req.body

  const contenido = new Contenido({
    title,
    content,
    image,
    link,
    topic,
    type,
    approved,
    approved_by,
    author
  })
  await contenido.save()
  res.json({
    contenido
  })
}

const contentsPut = async (req, res = response) => {
  const { id } = req.params
  const { __id, ...resto } = req.body
  // let approved = false
  // if an author changes their content, the content must be approved again by an editor
  const contenido = await Contenido.findByIdAndUpdate(id, resto)

  res.json(contenido)
}

const approveContent = async (req, res = response) => {
  // A content is approved when approved it's true
  const { id } = req.params
  // Every content includes an id that identifies it
  const content = await Contenido.findByIdAndUpdate(id, { approved: true })

  res.json(content)
}

module.exports = {
  contentsGet,
  getContentsByType,
  getContentsByTopic,
  getApprovedContents,
  getNotApprovedContents,
  getContentHiglight,
  getContentApprovedBy,
  getContentApprovedCreatedBy,
  getContentToBeApprovedCreatedBy,
  contentsPost,
  contentsPut,
  approveContent
}
