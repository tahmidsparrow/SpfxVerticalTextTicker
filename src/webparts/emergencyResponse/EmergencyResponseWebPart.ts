import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'EmergencyResponseWebPartStrings';
import EmergencyResponse from './components/EmergencyResponse';
import { IEmergencyResponseProps } from './components/IEmergencyResponseProps';

import pnp from "sp-pnp-js";

export interface IEmergencyResponseWebPartProps {
  description: string;
  maxMessages: number;
  transitionSpeed: number;
}

export default class EmergencyResponseWebPart extends BaseClientSideWebPart <IEmergencyResponseWebPartProps> {

  /**
   * This function ensures maximum value never crossed the limit and it is a number only
   */
  private validateNumber(maxValue: string): string {
    console.clear();
    if (maxValue === null || maxValue === "") {
      return "value cannot be empty";
    }
    else if (parseInt(maxValue) < 1 || parseInt(maxValue) === NaN) {
      return "value must be greater then zero";
    }
    return '';
  }

  public render(): void {
    const element: React.ReactElement<IEmergencyResponseProps> = React.createElement(
      EmergencyResponse,
      {
        description: this.properties.description,
        maxMessages: this.properties.maxMessages,
        transitionSpeed: this.properties.transitionSpeed
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    pnp.setup({
      spfxContext: this.context
    })

    return super.onInit();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                
                PropertyPaneTextField('maxMessages', {
                  label: strings.MaxMessagesLabel,
                  onGetErrorMessage: this.validateNumber
                }),

                PropertyPaneTextField('transitionSpeed', {
                  label: strings.TransitionSpeedLabel,
                  onGetErrorMessage: this.validateNumber
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
