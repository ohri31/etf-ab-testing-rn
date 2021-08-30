import React, { Component } from 'react';
import { getUniqueId } from 'react-native-device-info';
import {apiCall} from './api';

const ENDPOINT = 'http://localhost:8000';

export default function ABExperiment({
  componentA,
  componentB,
  token,
  track = ['impression', 'interaction'],
  onClick = null
}) {
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    fetchVariant();
  }, [])

  useEffect(() => {
    if(variant && track.includes('impression')) {
      record('impression');
    }
  }, [variant])

  async function fetchVariant() {
    try {
      const deviceId = await getUniqueId();
      const variantPayload = await apiCall({
        endpoint: `${ENDPOINT}/api/initialize/${deviceId}/${token}`,
        method: 'GET',
      });

      setVariant(variantPayload.variant);
    } catch(err) {
      console.error(err);
      setVariant('a');
    }
  }

  async function record(metric) {
    try {
      await apiCall({
        endpoint: `${ENDPOINT}/api/record`,
        method: 'POST',
        body: {
          deviceId: token,
          metric: metric,
          variant: variant,
          experimentToken: token
        }
      })
    } catch(err) {
      consol.error(err);
    }
  }

  if(variant) {
    return null;
  }

  const ComponentReturn = variant === 'a' ? componentA : componentB;

  return (
    <ComponentReturn onClick={() => {
      record('interaction');
      onClick();
    }} />
  );
}