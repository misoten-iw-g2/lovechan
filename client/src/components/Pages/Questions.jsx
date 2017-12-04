/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {withRouter} from 'react-router';
import {ThreeChoice} from '../Templates';

type Props = {
  recordStart: () => void,
  recordSave: () => void,
};

function QuestionsComponent(props: Props) {
  return (
    <div id="questions">
      <Grid width="100%" gap={0}>
        <ThreeChoice
          choiceApi={props.recordStart}
          postApi={props.recordSave}
          choiceTitle="昨晩どんな夢を見ましたか？"
          choice1="面白い"
          choice2="見てない"
          choice3="悪夢"
        />
      </Grid>
    </div>
  );
}

function Questions() {
  return withRouter(QuestionsComponent);
}

export default Questions();
