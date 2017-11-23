/* @flow */
import * as React from 'react';
import {Header} from 'semantic-ui-react';
import classNames from 'classnames';
import Grid from 'react-css-grid';
import {MikeOff, MikeOn} from '../Icons';

type Props = {
  choiceApi: () => void,
  postApi: () => void,
  choiceTitle: string,
  choice1: string,
  choice2: string,
  choice3: string,
  choice4: string,
};

class FourChoice extends React.Component<Props> {
  componentDidMount() {}

  render() {
    const {
      choiceTitle = '画面に何が出ていますか？',
      choice1 = 'エラーが出てる',
      choice2 = '勝手に壊れた',
      choice3 = '画面が映らない',
      choice4 = 'ネットに繋がらない',
    } = this.props;
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
          className={classNames('grid-btn')}>
          <div className={classNames('app_btn', 'app_btn-voice_choiced')}>
            <p>{choice1}</p>
          </div>
          <div className={classNames('app_btn')}>
            <p>{choice2}</p>
          </div>
          <div className={classNames('app_btn')}>
            <p>{choice3}</p>
          </div>
          <div className={classNames('app_btn')}>
            <p>{choice4}</p>
          </div>
        </Grid>

        <Grid width="100%" gap={0} className={classNames('grid-mike')}>
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

export default FourChoice;
