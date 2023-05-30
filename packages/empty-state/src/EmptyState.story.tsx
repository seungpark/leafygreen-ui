import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { storybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

import BasicEmptyStateStoryMeta, {
  WithActionsAndLink,
  WithSmallGraphic,
} from './BasicEmptyState/BasicEmptyState.story';
import FeaturesEmptyStateStoryMeta, {
  ThreeFeaturesWithSecondaryActionAndLink,
  TwoFeaturesWithSecondaryActionAndLink,
} from './FeaturesEmptyState/FeaturesEmptyState.story';
import {
  BasicEmptyState,
  type BasicEmptyStateProps,
  FeaturesEmptyState,
  type FeaturesEmptyStateProps,
} from '.';

const StoryVariant = {
  Basic: 'Basic',
  BasicWithSmallAsset: 'BasicWithSmallAsset',
  TwoFeatures: 'Two Features',
  ThreeFeatures: 'Three Features',
} as const;

type StoryVariant = typeof StoryVariant[keyof typeof StoryVariant];

const meta: StoryMetaType<typeof BasicEmptyState | typeof FeaturesEmptyState> =
  {
    title: 'Components/EmptyState',
    args: {
      variant: StoryVariant.Basic,
    },
    argTypes: {
      variant: {
        control: 'radio',
        options: Object.values(StoryVariant),
      },
      darkMode: storybookArgTypes.darkMode,
    },
    parameters: {
      default: 'LiveExample',
    },
  };

export default meta;

export const LiveExample = ({
  // @ts-expect-error Props for the LiveExample story do not correspond to documented component's props
  // eslint-disable-next-line react/prop-types
  variant,
  ...rest
}) => {
  let StoryComponent: StoryFn<BasicEmptyStateProps | FeaturesEmptyStateProps> =
    WithActionsAndLink;
  let storyComponentProps: BasicEmptyStateProps | FeaturesEmptyStateProps =
    {} as BasicEmptyStateProps | FeaturesEmptyStateProps;

  if (variant === StoryVariant.Basic) {
    StoryComponent = WithActionsAndLink;
    storyComponentProps = {
      ...BasicEmptyStateStoryMeta.args,
      ...WithActionsAndLink.args,
    } as BasicEmptyStateProps;
  } else if (variant === StoryVariant.BasicWithSmallAsset) {
    StoryComponent = WithSmallGraphic;
    storyComponentProps = {
      ...BasicEmptyStateStoryMeta.args,
      ...WithSmallGraphic.args,
    } as BasicEmptyStateProps;
  } else if (variant === StoryVariant.TwoFeatures) {
    StoryComponent = TwoFeaturesWithSecondaryActionAndLink;
    storyComponentProps = {
      ...FeaturesEmptyStateStoryMeta.args,
      ...TwoFeaturesWithSecondaryActionAndLink.args,
    } as FeaturesEmptyStateProps;
  } else if (variant === StoryVariant.ThreeFeatures) {
    StoryComponent = ThreeFeaturesWithSecondaryActionAndLink;
    storyComponentProps = {
      ...FeaturesEmptyStateStoryMeta.args,
      ...ThreeFeaturesWithSecondaryActionAndLink.args,
    } as FeaturesEmptyStateProps;
  }

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      {/* @ts-expect-error - props are not specific enough */}
      <StoryComponent {...storyComponentProps} {...rest} />
      <div style={{ marginTop: spacing[4] }}>
        * Note: Controls below are designed specifically for the Live Example
        and may not correspond to the React component&apos;s properties.
      </div>
    </div>
  );
};