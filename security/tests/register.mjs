/**
 * Registers the '@/' path alias resolver before running tests.
 * Usage: node --import ./security/tests/register.mjs --test <file>
 */
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('./loader.mjs', pathToFileURL('./security/tests/'));
