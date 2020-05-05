import { Router } from "express"
import Subscriber from "../../models/Subscriber"
const router = Router()

/**
 * @name subscribers::list
 * @route { GET } api/subs
 * @desc Gets a list of all subscribers
 * @access Public
 */
router.get("/", async (req, res, next) => {
  try {
    const subs = await Subscriber.find().sort({ modified: -1 })
    res.json(subs)
  } catch (e) {
    return next(e)
  }
})

/**
 * @name subscribers::read
 * @route { GET } api/subs
 * @desc Gets a specific subscriber
 * @access Public
 */
router.get("/:id", async (req, res, next) => {
  try {
    const sub = await Subscriber.findById(req.params.id)
    if (sub === null) {
      throw new Error(`No subscriber found with id ${req.params.id}`)
    }
    res.json(sub)
  } catch (e) {
    return next(e)
  }
})

/**
 * @name subscribers::create
 * @route { POST } api/subs
 * @desc Creates a new subscriber
 * @access Public
 */
router.post("/", async (req, res, next) => {
  const newSub = new Subscriber({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })
  try {
    const dbEntry = await newSub.save()
    res.json(dbEntry)
  } catch (e) {
    return next(e)
  }
})

/**
 * @name subscribers::delete
 * @route { DELETE } api/subs/:id
 * @desc Deletes a subscriber
 * @access Public
 */
router.delete("/:id", async (req, res, next) => {
  try {
    await Subscriber.findById(req.params.id).remove()
    res.json({
      success: true,
      msg: `Subscriber ${req.params.id} deleted successfully.`,
    })
  } catch (e) {
    return res.status(404).json({
      success: false,
      msg: e.message,
    })
  }
})

/**
 * @name subscribers::update
 * @route { POST } api/subs/:id
 * @desc Updates a subscriber
 * @access Public
 */
router.post("/:id", async (req, res, next) => {
  try {
    const updatedSub = await Subscriber.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        modified: Date.now(),
      },
      { new: true }
    )
    res.json(updatedSub)
  } catch (e) {
    return res.status(404).json({
      success: false,
      msg: e.message,
    })
  }
})

export default router
