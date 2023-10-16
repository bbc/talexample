# Example TAL Application
![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)
[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

An example TV application using the [TAL](https://www.github.com/bbc/tal) framework from the BBC.

## TAL Replacement update 28/09/2023

We are working towards an approach of modular packages focused on specific features such as playback, navigation, and device abstraction. We do not intend to provide a UI framework, and these packages should work with a number of front-end frameworks. As part of this work, we are in the process of making internal TV packages open source. Some of these have been released already including:

- [Bigscreen Player](https://github.com/bbc/bigscreen-player)
- [LRUD Spatial](https://github.com/bbc/lrud-spatial)
- [Melanite](https://github.com/bbc/melanite)

Looking further to the future, we are developing an open source demo app, including associated documentation. This will enable the wider community to understand how these packages work together to build a TV application.

## Contact us at BBC TV Open Source 20/03/2023

We have now created a mailbox where you can [contact us](mailto:tvopensource@bbc.co.uk) with any questions related to TAL or the
future of this project. We aim to respond to emails within a week. We hope to share some details of the replacement to TAL soon.

# Deprecation Announcement 09/01/2023

On 12/12/2022 we announced the deprecation of [TAL](https://github.com/bbc/tal/), on which this repository is based.
This will allow us to concentrate on future work, which we hope to share details of soon.

We apologise that we were not active in keeping the TAL community up to date with the status of these
projects. Going forward, we will provide regular updates on the future of TAL.

As part of the deprecation, pull requests will be disabled and outstanding issues will be closed.
TAL and this example repository will not be actively maintained.

We will answer any questions found in the issues backlog as best we can. There will soon be a email address you
can use to contact us. This readme will be updated when this becomes available.

---

<img src="./assets/main.png" width="500">

<img src="./assets/carousel.png" width="500">

<img src="./assets/playback.png" width="500">



# Getting Started

```
git clone git@github.com:bbc/talexample.git
cd talexample
npm install
npm start
```

Visit http://localhost:1337 in your browser. Use the UP, DOWN, LEFT, RIGHT keys to navigate, use ENTER/RETURN to select.

# More Information

See [github.com/bbc/tal](https://www.github.com/bbc/tal) or [bbc.github.io/tal](http://bbc.github.io/tal/getting-started/introducing-tal.html) for documentation.
