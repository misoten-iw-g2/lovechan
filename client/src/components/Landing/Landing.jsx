/* @flow */
import * as React from 'react';
import {Grid} from 'semantic-ui-react';

import _words from '../../config/words';
import {TwoChoice} from '../Base';

type Props = {
  recordStart: () => void,
  recordSave: () => void,
};

const {Row, Column} = Grid;

const Landing = (props: Props) => (
  <Grid id="landing">
    <Row>
      <Column width={16}>
        <TwoChoice
          choiceApi={props.recordStart}
          postApi={props.recordSave}
          choiceTitle="モードを選択して下さい"
          choice1="ストーリー"
          choice2="ラヴちゃんと会話する"
        />
      </Column>
    </Row>
  </Grid>
);

export default Landing;
