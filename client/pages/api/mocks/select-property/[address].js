// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { address } = req.query
  res.status(200).json({ owner: `John Doer`, address: address})
}
