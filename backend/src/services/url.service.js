const nanoid = require("nanoid");
const urlModel = require("../models/url.model");

const create = async ( userId, originalUrl, expiresAt, alias ) => {
  const shortCode = alias || nanoid(6);
  const result = urlModel.createUrl(userId, shortCode, originalUrl, expiresAt, alias);
  return result;
}