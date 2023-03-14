import React from 'react'
import PropTypes from 'prop-types'

export const Counter = ({ counter, increment, doubleAsync }) => (
  <div style={{ margin: '0 auto' }} >
    <section className="page-section bg-primary text-white mb-0" id="about">
      <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-white">About</h2>
          <div className="divider-custom divider-light">
              <div className="divider-custom-line"></div>
              <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
              <div className="divider-custom-line"></div>
          </div>
          <div className="row">
            <div className="col-lg-4 ms-auto"><p className="lead">Farming has always been an utmost source for many families from ancient periods to the current times and fortunately, the origin of our story is on the same basis in the Nandyal district. Mibbles was first started by a family of farmers, who are highly incused in harvesting heritage. To begin with, Nandyal is quite famous for its millet growth, and we as a community did not want to lose this culture and heritage because of the new technological advancement rather, we wanted to extend this culture with technology.</p></div>
            <div className="col-lg-4 me-auto"><p className="lead">We, as a team, bring you a variety of delicious millet-made snacks to nibble guilt-free. We started with an idea to bring back nutrition to our snacks with high-quality millets & ingredients that are good for everyone. In addition to this, we are also providing for our community of farmers. Mibbles works with FPOs across the country to promote the cultivation of millets, and have distributed well-nourished millet seeds for sowing & purchases harvested crops at an assured price.</p></div>
          </div>
        </div>
      </section>
  </div>
)
Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
}

export default Counter
