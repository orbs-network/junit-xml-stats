# junit-xml-stats

Useful and small utility to summarize failure logs of tests in case you
have a long list of failed and successful outputs inside your JUnit report but are intrested only in the failing logs.

# Installation

    npm install junit-xml-stats -g

# Usage

Assuming you have a `results.xml` file ready in JUnit format, simply point the `junit-xml-stats` to it and it will print out the failing tests summary.

```
    $ junit-xml-stats ./acceptance/results.xml

    Test name: TestFoo
    Runs/Fails: 12/1
Fail log #0:
*******************************
b.go:7: info 2019-02-07T08:41:14.687952Z some log message 
b.go:7: info 2019-02-07T08:41:14.687952Z some log message #2
b.go:7: info 2019-02-07T08:41:14.687952Z some log message #3
*******************************
    Fail log #0 end
```
