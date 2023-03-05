/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.29.1
  Forc version: 0.32.2
  Fuel-Core version: 0.15.1
*/

import type {
  Interface,
  FunctionFragment,
  DecodedValue,
  Contract,
  BytesLike,
  BigNumberish,
  InvokeFunction,
  BN,
} from 'fuels';

interface CounterContractAbiInterface extends Interface {
  functions: {
    count: FunctionFragment;
    increment: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'count', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'increment', values: []): Uint8Array;

  decodeFunctionData(functionFragment: 'count', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'increment', data: BytesLike): DecodedValue;
}

export class CounterContractAbi extends Contract {
  interface: CounterContractAbiInterface;
  functions: {
    count: InvokeFunction<[], BN>;
    increment: InvokeFunction<[], void>;
  };
}
