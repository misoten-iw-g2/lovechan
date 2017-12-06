/* @flow */
import * as React from 'react';
import Grid from 'react-css-grid';
import {TwoChoice} from '../Templates';
import {url} from '../../config';

type Props = {
  recordAudio: () => void,
  saveAudio: () => void,
  routing: (apiUrl: string, blob: any) => void,
  talks: {wav: any},
};

function StoriesComponent(props: Props) {
  const handleClick = async action => {
    switch (action) {
      case 'RECORD':
        await props.recordAudio();
        break;
      case 'SAVE':
        await props.saveAudio();
        break;
      default:
        break;
    }
  };

  const fetchRouting = async () => {
    const propWAV = props.talks.wav;
    if (propWAV !== null) {
      await props.routing(url.apis.stories, propWAV);
    }
  };

  return (
    <div id="stories">
      <Grid width="100%" gap={0} onClick={() => fetchRouting()}>
        <TwoChoice
          recordApi={() => handleClick('RECORD')}
          saveApi={() => handleClick('SAVE')}
          choiceTitle="どのストーリーで遊びますか？"
          choice1="突然のエラー"
          choice2="仕様変更"
        />
      </Grid>
    </div>
  );
}

function Stories() {
  return StoriesComponent;
}

export default Stories();
