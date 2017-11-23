/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {TwoChoice} from '../Choice';

type Props = {
  recordStart: () => void,
  recordSave: () => void,
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
      />
    </Grid>
  </div>
);

export {Landing as default, Landing};
