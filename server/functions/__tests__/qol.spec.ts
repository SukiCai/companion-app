import mockProcess from './mocks/client/process';
process = mockProcess;

import { fail } from 'assert';
import { expect, assert } from 'chai';

import { initializeAsync } from '../../../common/services/firebase';
import { init } from './util/firebase';
import clientConfig from './mocks/client/config';

import { createDomain, createQuestion, getDomains } from 'server/qol';

const test = init('qol-test');

describe('QoL', () => {
    beforeAll(async () => {
        // Initialize testing client
        await initializeAsync(clientConfig);
    });
    describe('Domains', () => {
        describe('Domain Creation', () => {
            afterEach(async () => {
                await test.cleanup();
            });
            it('Should allow a domain to be created', async () => {
                const result = await createDomain({
                    scope: 'GENERAL',
                    position: 1,
                    name: 'Physical',
                    slug: 'physical',
                });
                assert.isNull(result.error);
            });
            it('Should not allow a domain to be created if the scope is not valid', async () => {
                const result = await createDomain({
                    scope: 'NOT_A_VALID_SCOPE',
                    position: 1,
                    name: 'Physical',
                    slug: 'physical',
                });
                assert.isNotNull(result.error);
            });
        });
        describe('Domain List', () => {
            afterEach(async () => {
                await test.cleanup();
            });
            it('Should list no domains before any are added', async () => {
                const result = await getDomains();
                assert.isNull(result.error);
                assert.lengthOf(result.results, 0);
            });
            it('Should list domains that are added', async () => {
                await createDomain({
                    scope: 'GENERAL',
                    position: 1,
                    name: 'Physical',
                    slug: 'physical',
                });
                const result = await getDomains();
                assert.isNull(result.error);
                assert.lengthOf(result.results, 1);
            });
        });
    });
    describe('Question Creation', () => {
        afterEach(async () => {
            await test.cleanup();
        });
        it('Should not allow a question to be created if the domain slug is invalid', async () => {
            const result = await createQuestion({
                text: "had plenty of energy",
                domainSlug: "not_a_valid_slug",
                position: 1,
            });
            assert.isNotNull(result.error);
        });
    });
});