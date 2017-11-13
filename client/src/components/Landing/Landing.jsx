/* @flow */
import * as React from 'react';
import {Grid, Header} from 'semantic-ui-react';
import classNames from 'classnames';

import _words from '../../config/words';
import {MikeOff, MikeOn} from '../Icons';
import './Landing.scss';

const {Row, Column} = Grid;

const Landing = (props: any) => {
  // const {} = props;
  console.log('landing');
  return (
    <Grid id="landing">
      <Row>
        <Column width={16} className={classNames('row_flex', 'row_center')}>
          <Header as="h1" className={classNames('header_description')}>
            モードを選択して下さい
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
          ストーリー
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
          ラヴちゃんと会話する
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
};

export default Landing;
