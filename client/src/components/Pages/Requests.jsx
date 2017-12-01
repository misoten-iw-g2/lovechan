/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {withRouter} from 'react-router';
import * as myself from './Requests';
import {ThreeChoice} from '../Templates';

type Props = {
  recordStart: () => void,
  recordSave: () => void,
};

export const Requests = (props: Props) => (
  <div id="requests">
    <Grid width="100%" gap={0}>
      <ThreeChoice
        choiceApi={props.recordStart}
        postApi={props.recordSave}
        choiceTitle="何をしてほしいですか？"
        choice1="一発芸"
        choice2="歌って"
        choice3="踊って"
      />
    </Grid>
  </div>
);

export default Object.assign(withRouter(Requests), myself);
