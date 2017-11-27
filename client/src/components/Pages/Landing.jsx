/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {withRouter} from 'react-router';
import {TwoChoice} from '../Templates';

type Props = {
  recordStart: () => void,
  recordSave: () => void,
  rootingFromRoot: () => void,
};

const Landing = (props: Props) => (
  <div id="landing">
    <Grid width="100%" gap={0}>
      <TwoChoice
        choiceApi={props.recordStart}
        postApi={props.recordSave}
        choiceTitle="モードを選択して下さい"
        choice1="ストーリー"
        choice2="ラヴちゃんと会話する"
        onClick={props.rootingFromRoot}
      />
    </Grid>
  </div>
);

export default withRouter(Landing);
