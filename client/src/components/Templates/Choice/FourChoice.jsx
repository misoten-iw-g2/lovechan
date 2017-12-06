/* @flow */
import * as React from 'react';
import {Header} from 'semantic-ui-react';
import classNames from 'classnames';
import Grid from 'react-css-grid';
import {MikeOff, MikeOn} from '../../Organisms';

type Props = {
  recordApi: () => void,
  saveApi: () => void,
  choiceTitle: string,
  choices: [],
};

const {Fragment} = React;

class FourChoiceComponent extends React.Component<Props> {
  componentDidMount() {}

  render() {
    const {recordApi, saveApi, choiceTitle, choices = []} = this.props;

    const mapChoicesRender = choices.map((item, index) => {
      const mapChoicesKey = `${item}${index}`;
      return (
        <Fragment key={mapChoicesKey}>
          <div className={classNames('app_btn')}>
            <p>{item}</p>
          </div>
        </Fragment>
      );
    });

    return (
      <div id="four_choice">
        <Grid width="100%" gap={0} className={classNames('grid-header')}>
          <Header as="h1" className={classNames('app_header')}>
            {choiceTitle}
          </Header>
        </Grid>

        <Grid
          width="calc(20vw)"
          gap="calc(2vw)"
          className={classNames('grid-btn')}
          onClick={() => saveApi()}
        >
          {mapChoicesRender}
        </Grid>

        <Grid
          width="100%"
          gap={0}
          className={classNames('grid-mike')}
          onClick={() => recordApi()}
        >
          <MikeOff
            className={classNames({app_mike: true, visible: true, hide: false})}
            fill="#fff"
          />
          <MikeOn
            className={classNames({app_mike: true, visible: false, hide: true})}
            fill="#fff"
          />
        </Grid>
      </div>
    );
  }
}

function FourChoice() {
  return FourChoiceComponent;
}

export default FourChoice();
