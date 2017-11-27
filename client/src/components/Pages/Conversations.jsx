/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {withRouter} from 'react-router';
import {TwoChoice} from '../Templates';

type Props = {
  recordStart: () => void,
  recordSave: () => void,
};

const Conversations = (props: Props) => (
  <div id="conversations">
    <Grid width="100%" gap={0}>
      <TwoChoice
        choiceApi={props.recordStart}
        postApi={props.recordSave}
        choiceTitle="ラブちゃんとしたいことを選んで下さい"
        choice1="何かお願いする"
        choice2="質問してもらう"
      />
    </Grid>
  </div>
);

export default withRouter(Conversations);
