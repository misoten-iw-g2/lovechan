/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {withRouter} from 'react-router';
import {ThreeChoice} from '../Templates';

type Props = {
  recordStart: () => void,
  recordSave: () => void,
};

function RequestsComponent(props: Props) {
  return (
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
}

function Requests() {
  return withRouter(RequestsComponent);
}

export default Requests();
