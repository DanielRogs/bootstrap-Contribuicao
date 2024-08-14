import EventHandler from '../../src/dom/event-handler.js'
import Modal from '../../src/modal.js'
import {
  clearBodyAndDocument, clearFixture, getFixture
} from '../helpers/fixture.js'

describe('Bootstrap Manual Initialization', () => {
  let fixtureElement

  beforeEach(() => {
    // Set up the HTML fixture for the test
    fixtureElement = getFixture()
    fixtureElement.innerHTML = `
      <div id="myModal" class="modal" tabindex="-1" role="dialog" data-bs-toggle="modal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
          </div>
        </div>
      </div>
    `
  })

  afterEach(() => {
    clearFixture()
    clearBodyAndDocument()
    document.body.classList.remove('modal-open')

    for (const backdrop of document.querySelectorAll('.modal-backdrop')) {
      backdrop.remove()
    }
  })

  it('should not initialize Bootstrap components automatically', () => {
    // Instantiate a Bootstrap Modal but don't manually initialize it
    const modal = new Modal(fixtureElement.querySelector('#myModal'))

    // Verify that EventHandler.on was not called
    expect(modal.on).not.toHaveBeenCalled()
  })

  it('should initialize Bootstrap components when manually initialized', () => {
    // Instantiate and manually initialize the Bootstrap Modal
    const modalInstance = new Modal(fixtureElement.querySelector('#myModal'))
    modalInstance.initialize()

    // Verify that EventHandler.on was called after manual initialization
    expect(EventHandler.on).toHaveBeenCalled()
  })

  it('should provide an option to disable automatic initialization globally', () => {
    // Set a global flag or option to disable automatic initialization
    Modal.disableAutoInit = true

    // Instantiate a Bootstrap Modal without manual initialization
    const modal = new Modal(fixtureElement.querySelector('#myModal'))

    // Verify that EventHandler.on was not called
    expect(modal.on).not.toHaveBeenCalled()

    // Reset the flag for other tests
    Modal.disableAutoInit = false
  })
})
