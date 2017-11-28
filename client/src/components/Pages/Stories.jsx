/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {withRouter} from 'react-router';
import {TwoChoice} from '../Templates';

type Props = {
  recordStart: () => void,
  recordSave: () => void,
};

const Stories = (props: Props) => (
  <div id="stories">
    <Grid width="100%" gap={0}>
      <TwoChoice
        choiceApi={props.recordStart}
        postApi={props.recordSave}
        choiceTitle="どのストーリーで遊びますか？"
        choice1="突然のエラー"
        choice2="仕様変更"
      />
    </Grid>
  </div>
);

export default withRouter(Stories);