/* @flow */
import * as React from 'react';
import {Grid, Header} from 'semantic-ui-react';
import classNames from 'classnames';
import {MikeOff, MikeOn} from '../Icons';
import './TwoChoice.scss';

const {Row, Column} = Grid;

type Props = {
  choiceApi: () => void,
  postApi: () => void,
  choiceTitle: string,
  choice1: string,
  choice2: string,
};

class TwoChoice extends React.Component<Props> {
  componentDidMount() {
    this.props.choiceApi();
  }

  render() {
    const {choiceTitle, choice1, choice2} = this.props;
    return (
      <Grid id="two_choice">
        <Row>
          <Column width={16} className={classNames('row_flex', 'row_center')}>
            <Header as="h1" className={classNames('header_description')}>
              {choiceTitle}
            </Header>
          </Column>
        </Row>
        <Row className={classNames('btn_voice_choice-fix')}>
          <Column
            width={16}
            className={classNames({
              btn: true,
              'btn-active': true,
              btn_voice_choice: true,
              row_flex: true,
              row_center: true,
            })}>
            {choice1}
          </Column>
        </Row>
        <Row>
          <Column
            width={16}
            className={classNames(
              'btn',
              'btn_voice_choice',
              'row_flex',
              'row_center',
            )}>
            {choice2}
          </Column>
        </Row>
        <Row>
          <Column width={16} className={classNames('row_flex', 'row_center')}>
            <MikeOff
              className={classNames({mike: true, visible: true, hide: false})}
              fill="#fff"
            />
            <MikeOn
              className={classNames({mike: true, visible: false, hide: true})}
              fill="#fff"
            />
          </Column>
        </Row>
      </Grid>
    );
  }
}

export default TwoChoice;
