#!/usr/bin/env node

const parser = require('fast-xml-parser');
const path = require('path');
const { readFileSync } = require('fs');
const targetPath = path.join(process.cwd(), process.argv[2]);
const fileAsString = readFileSync(targetPath);

var options = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false,
};

const jsonObj = parser.parse(fileAsString.toString(), options);
const tests = [];

const testsuite = jsonObj.testsuites.testsuite;

testsuite.testcase.forEach(test => {
    const index = tests.findIndex(t => t.name === test.attr['@_name']);
    let testCursor;

    if (index === -1) {
        testCursor = {
            count: 1,
            name: test.attr['@_name'],
            failureLogs: [],
        }
        tests.push(testCursor);
    } else {
        testCursor = tests[index];
        testCursor.count++;
    }

    if ('failure' in test) {
        if ('#text' in test.failure) {
            testCursor.failureLogs.push(test.failure['#text']);
        } else {
            testCursor.failureLogs.push('No log supplied');
        }
    }
});

tests
    .filter(test => test.failureLogs.length > 0)
    .forEach(test => {
        console.log(`Test name: ${test.name}`);
        console.log(`Runs/Fails: ${test.count}/${test.failureLogs.length}`);

        test.failureLogs.forEach((failLog, index) => {
            console.log(`Fail log #${index}:`);
            console.log('*******************************');
            console.log(failLog.split('&#xA;').join('\n'));
            console.log('');
            console.log('*******************************')
            console.log(`    Fail log #${index} end     `);
        });
    });
