import React, { Component } from 'react';

const links = [
  {
    id: 1,
    header: 'Platform Tutorial',
    linktext: 'Download PDF',
    link: '/files/Business_presentation.pptx',
  },

  {
    id: 2,
    header: 'E-Mail',
    linktext: 'Contact us',
  },
  {
    id: 3,
    header: 'Defima Community',
    linktext: 'Join Telegram',
  },
  {
    id: 4,
    header: 'Blog/News',
    linktext: 'Open Blog',
  },
];

const faq = [
  {
    id: 1,
    question: 'Who is behind DEFIMA?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati modi suscipit, temporibus architecto, alias iusto natus fugit ea a esse laboriosam quo, atque, quis cum doloribus laborum iure corporis. Facilis.</div><div>Optio animi libero reiciendis debitis culpa, quas labore, aliquid! Inventore dolor ullam perspiciatis totam nemo, molestiae ex. Rerum ea inventore aut explicabo, amet. Enim blanditiis id voluptatem, nam maxime dolore?</div><div>Nisi exercitationem dolores praesentium facilis labore ratione, eius, ipsa odio provident sunt ab fugit laboriosam harum. Ullam blanditiis eligendi, soluta, nesciunt cumque excepturi numquam quibusdam delectus perspiciatis iste ipsum cum.</div><div>Laudantium, ratione, atque! Voluptatibus velit eveniet ut sed, ad quod. Commodi reprehenderit impedit sapiente exercitationem ipsa esse, quasi incidunt suscipit. Quia numquam, illo aperiam dolorum voluptates incidunt vel excepturi, totam!</div><div>Eveniet quos ipsam dignissimos ullam explicabo praesentium aperiam veritatis, quam, ad temporibus, dolorum doloribus ducimus accusantium voluptatem dolores vel? Molestias rerum voluptas doloribus, error harum aperiam voluptatem? Maiores, molestiae, fugiat!</div><div>Non vitae fugiat dolorum minima veritatis, necessitatibus animi alias natus, pariatur expedita veniam soluta. Fugit, doloremque, ab. Earum doloribus commodi, maiores dolorum quisquam quae voluptatem modi, aspernatur laborum magnam similique.</div><div>Repellendus consectetur nisi perspiciatis voluptas praesentium animi veniam ab natus magnam quia beatae, possimus quas nam, eaque iste! Ducimus quaerat recusandae fugit repellendus mollitia dolor soluta. Rem numquam nam vitae.',
  },
  {
    id: 2,
    question: 'How does Defima protect investors assets?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati modi suscipit, temporibus architecto, alias iusto natus fugit ea a esse laboriosam quo, atque, quis cum doloribus laborum iure corporis. Facilis.</div><div>Optio animi libero reiciendis debitis culpa, quas labore, aliquid! Inventore dolor ullam perspiciatis totam nemo, molestiae ex. Rerum ea inventore aut explicabo, amet. Enim blanditiis id voluptatem, nam maxime dolore?</div><div>Nisi exercitationem dolores praesentium facilis labore ratione, eius, ipsa odio provident sunt ab fugit laboriosam harum. Ullam blanditiis eligendi, soluta, nesciunt cumque excepturi numquam quibusdam delectus perspiciatis iste ipsum cum.</div><div>Laudantium, ratione, atque! Voluptatibus velit eveniet ut sed, ad quod. Commodi reprehenderit impedit sapiente exercitationem ipsa esse, quasi incidunt suscipit. Quia numquam, illo aperiam dolorum voluptates incidunt vel excepturi, totam!</div><div>Eveniet quos ipsam dignissimos ullam explicabo praesentium aperiam veritatis, quam, ad temporibus, dolorum doloribus ducimus accusantium voluptatem dolores vel? Molestias rerum voluptas doloribus, error harum aperiam voluptatem? Maiores, molestiae, fugiat!</div><div>Non vitae fugiat dolorum minima veritatis, necessitatibus animi alias natus, pariatur expedita veniam soluta. Fugit, doloremque, ab. Earum doloribus commodi, maiores dolorum quisquam quae voluptatem modi, aspernatur laborum magnam similique.</div><div>Repellendus consectetur nisi perspiciatis voluptas praesentium animi veniam ab natus magnam quia beatae, possimus quas nam, eaque iste! Ducimus quaerat recusandae fugit repellendus mollitia dolor soluta. Rem numquam nam vitae.',
  },
  {
    id: 3,
    question: 'Why is DEFIMA trustworthy?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati modi suscipit, temporibus architecto, alias iusto natus fugit ea a esse laboriosam quo, atque, quis cum doloribus laborum iure corporis. Facilis.</div><div>Optio animi libero reiciendis debitis culpa, quas labore, aliquid! Inventore dolor ullam perspiciatis totam nemo, molestiae ex. Rerum ea inventore aut explicabo, amet. Enim blanditiis id voluptatem, nam maxime dolore?</div><div>Nisi exercitationem dolores praesentium facilis labore ratione, eius, ipsa odio provident sunt ab fugit laboriosam harum. Ullam blanditiis eligendi, soluta, nesciunt cumque excepturi numquam quibusdam delectus perspiciatis iste ipsum cum.</div><div>Laudantium, ratione, atque! Voluptatibus velit eveniet ut sed, ad quod. Commodi reprehenderit impedit sapiente exercitationem ipsa esse, quasi incidunt suscipit. Quia numquam, illo aperiam dolorum voluptates incidunt vel excepturi, totam!</div><div>Eveniet quos ipsam dignissimos ullam explicabo praesentium aperiam veritatis, quam, ad temporibus, dolorum doloribus ducimus accusantium voluptatem dolores vel? Molestias rerum voluptas doloribus, error harum aperiam voluptatem? Maiores, molestiae, fugiat!</div><div>Non vitae fugiat dolorum minima veritatis, necessitatibus animi alias natus, pariatur expedita veniam soluta. Fugit, doloremque, ab. Earum doloribus commodi, maiores dolorum quisquam quae voluptatem modi, aspernatur laborum magnam similique.</div><div>Repellendus consectetur nisi perspiciatis voluptas praesentium animi veniam ab natus magnam quia beatae, possimus quas nam, eaque iste! Ducimus quaerat recusandae fugit repellendus mollitia dolor soluta. Rem numquam nam vitae.',
  },
  {
    id: 4,
    question: 'How does Defima generate profits?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati modi suscipit, temporibus architecto, alias iusto natus fugit ea a esse laboriosam quo, atque, quis cum doloribus laborum iure corporis. Facilis.</div><div>Optio animi libero reiciendis debitis culpa, quas labore, aliquid! Inventore dolor ullam perspiciatis totam nemo, molestiae ex. Rerum ea inventore aut explicabo, amet. Enim blanditiis id voluptatem, nam maxime dolore?</div><div>Nisi exercitationem dolores praesentium facilis labore ratione, eius, ipsa odio provident sunt ab fugit laboriosam harum. Ullam blanditiis eligendi, soluta, nesciunt cumque excepturi numquam quibusdam delectus perspiciatis iste ipsum cum.</div><div>Laudantium, ratione, atque! Voluptatibus velit eveniet ut sed, ad quod. Commodi reprehenderit impedit sapiente exercitationem ipsa esse, quasi incidunt suscipit. Quia numquam, illo aperiam dolorum voluptates incidunt vel excepturi, totam!</div><div>Eveniet quos ipsam dignissimos ullam explicabo praesentium aperiam veritatis, quam, ad temporibus, dolorum doloribus ducimus accusantium voluptatem dolores vel? Molestias rerum voluptas doloribus, error harum aperiam voluptatem? Maiores, molestiae, fugiat!</div><div>Non vitae fugiat dolorum minima veritatis, necessitatibus animi alias natus, pariatur expedita veniam soluta. Fugit, doloremque, ab. Earum doloribus commodi, maiores dolorum quisquam quae voluptatem modi, aspernatur laborum magnam similique.</div><div>Repellendus consectetur nisi perspiciatis voluptas praesentium animi veniam ab natus magnam quia beatae, possimus quas nam, eaque iste! Ducimus quaerat recusandae fugit repellendus mollitia dolor soluta. Rem numquam nam vitae.',
  },
  {
    id: 5,
    question: 'What is Defima’s business model?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati modi suscipit, temporibus architecto, alias iusto natus fugit ea a esse laboriosam quo, atque, quis cum doloribus laborum iure corporis. Facilis.</div><div>Optio animi libero reiciendis debitis culpa, quas labore, aliquid! Inventore dolor ullam perspiciatis totam nemo, molestiae ex. Rerum ea inventore aut explicabo, amet. Enim blanditiis id voluptatem, nam maxime dolore?</div><div>Nisi exercitationem dolores praesentium facilis labore ratione, eius, ipsa odio provident sunt ab fugit laboriosam harum. Ullam blanditiis eligendi, soluta, nesciunt cumque excepturi numquam quibusdam delectus perspiciatis iste ipsum cum.</div><div>Laudantium, ratione, atque! Voluptatibus velit eveniet ut sed, ad quod. Commodi reprehenderit impedit sapiente exercitationem ipsa esse, quasi incidunt suscipit. Quia numquam, illo aperiam dolorum voluptates incidunt vel excepturi, totam!</div><div>Eveniet quos ipsam dignissimos ullam explicabo praesentium aperiam veritatis, quam, ad temporibus, dolorum doloribus ducimus accusantium voluptatem dolores vel? Molestias rerum voluptas doloribus, error harum aperiam voluptatem? Maiores, molestiae, fugiat!</div><div>Non vitae fugiat dolorum minima veritatis, necessitatibus animi alias natus, pariatur expedita veniam soluta. Fugit, doloremque, ab. Earum doloribus commodi, maiores dolorum quisquam quae voluptatem modi, aspernatur laborum magnam similique.</div><div>Repellendus consectetur nisi perspiciatis voluptas praesentium animi veniam ab natus magnam quia beatae, possimus quas nam, eaque iste! Ducimus quaerat recusandae fugit repellendus mollitia dolor soluta. Rem numquam nam vitae.',
  },
  {
    id: 6,
    question: 'Who can participate?',
    answer:
      'Anyone can participate, as long as you have an internet connection (to use our website) and access to a bitcoin wallet (to deposit and Withdraw your money). Also, please note we don’t accept people from the USA and Canada.',
  },
];

const FaqLink = ({ id, header, linktext }) => {
  return (
    <div className="faq-links-linkbox">
      <h5 className="blue-text">{header}</h5>
      <a className="white-text">
        <h5>{linktext}</h5>
      </a>
    </div>
  );
};

class FaqTab extends Component {
  state = {
    isOpened: false,
  };

  handleClick = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  render() {
    const { question, answer } = this.props;

    return (
      <div
        className={
          'content-whitebox ' +
          (this.state.isOpened
            ? 'faq-questions-tab'
            : 'faq-questions-tab-closed')
        }
      >
        <div className="faq-questions-tab-panel">
          <h5 className="lightblue-text">{question}</h5>
          <svg
            onClick={() => this.handleClick()}
            role="img"
            className={'arrow' + (this.state.isOpened ? '' : '-closed')}
            preserveAspectRatio="xMinYMin slice"
            viewBox="0 0 25 15"
          >
            <use href="#arrow-down" />
          </svg>
        </div>
        <div
          className={this.state.isOpened ? 'faq-questions-tab-answer' : 'none'}
        >
          <p>{answer}</p>
        </div>
      </div>
    );
  }
}

class FaqsContent extends Component {
  render() {
    return (
      <div className="faq-box">
        <div className="faq-links">
          {links.map((link) => (
            <FaqLink
              key={link.id}
              id={link.id}
              header={link.header}
              linktext={link.linktext}
            />
          ))}
        </div>
        <div className="faq-questions">
          <h2 className="faq-questions-header">FAQ's</h2>
          {faq.map((tab) => (
            <FaqTab key={tab.id} question={tab.question} answer={tab.answer} />
          ))}
        </div>
      </div>
    );
  }
}

export default FaqsContent;
