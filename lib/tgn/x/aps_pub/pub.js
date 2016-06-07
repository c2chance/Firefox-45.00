typeof ancestry == "undefined" && (ancestry = {});
ancestry.pubDevLevel = "live";
ancestry.pubDomainInfo = {
    "0": {
        Pattern: "{domain}.ancestry{inst}.{partnerTld}",
        StandardDomains: ["apv", "hints", "interactive", "mediasvc", "person", "search", "trees", "addperson"],
        MappedDomains: {
            ancestry: "www",
            ancestryhome: "home",
            mymedia: "mv",
            contextui: "contextux"
        },
        partnerTld: {
            "0": "com",
            "5538": "co.uk",
            "5542": "com",
            "5543": "ca",
            "5544": "com.au",
            "5545": "de",
            "5546": "it",
            "5547": "fr",
            "5552": "se",
            "5553": "es",
            "5561": "com",
            "5565": "mx",
            "5822": "pl",
            "5823": "ie",
            "5824": "no",
            "5825": "com",
            "5826": "com",
            "5827": "se",
            "5828": "de",
            "5829": "ca",
            "5830": "co.uk",
            "5831": "com.au",
            "5840": "de",
            "5841": "ca",
            "5842": "co.uk",
            "5843": "com.au",
            "5852": "se"
        },
        inst: {
            "5542": "library",
            "5561": "institution",
            "5825": "heritagequest",
            "5826": "classroom",
            "5827": "library",
            "5828": "library",
            "5829": "library",
            "5830": "libraryedition",
            "5831": "library",
            "5840": "institution",
            "5841": "institution",
            "5842": "institution",
            "5843": "institution",
            "5852": "institution"
        }
    }
};

ancestry.pubVersion = 94;
ancestry.pubUrlInfos = {
    TreeRepositoryAdd: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/repository/create",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "SourceId",
            Key: "sid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RememberSourcePageData",
            Key: "css",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RememberRepositoryPageData",
            Key: "crs",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonVideoRecord: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/Video/RecordVideo.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    CategorySearchPage: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "SearchDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/search/category.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "CategoryId",
            Key: "cat",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    FamilySearchStartYourTree: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/fs/startyourtree",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "ForceImport",
            Key: "forceimport",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMediaObject: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "IndexOrObjectId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "OriginalTreeId",
            Key: "otid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "OriginalPersonId",
            Key: "opid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreePersonaSelectAddPerson: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/SelectAddPerson.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "RelationType",
            Key: "rel",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "Title",
            Key: "ttl",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SpouseId",
            Key: "sid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RelationshipId",
            Key: "rid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SiblingId",
            Key: "sib",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMediaGalleryVideo: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/video",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonHintsAccepted: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/hints/accepted",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeSettings: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/settings",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    SubmitAddPerson: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "AddPersonDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/modals/addperson/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/submit",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: [],
        FormParameters: {},
        RequiresBackLink: !1
    },

    RecordView: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "SearchDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/cgi-bin/sse.dll",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Constant",
            Value: "try",
            Key: "indiv",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionId",
            Key: "dbid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RecordId",
            Key: "h",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "GravitySearchSource",
            Key: "gss",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreePersonaSelectAttachRecord: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/AttachStree.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SSRC",
            Key: "ssrc",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionId",
            Key: "dbid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RecordId",
            Key: "rpid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SourceTreeId",
            Key: "stid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SourcePersonId",
            Key: "spid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ss",
            Key: "ss",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "sePT",
            Key: "sePT",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "seST",
            Key: "seST",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "seSubT",
            Key: "seSubT",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ssd",
            Key: "ssd",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "Rows",
            Key: "rows",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "LastName",
            Key: "ln",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "true",
            Key: "usePUB",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonViewHints: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "PersonDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/Hints",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMergeDuplicatePickPerson: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/mergeduplicate/pickperson",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "PersonIdPrimary",
            Key: "pid1",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMemberConnectFeed: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/community/feed",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonFactsCitationEdit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "PersonDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/facts/citation/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CitationId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/edit/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TabName",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonLifeStoryEventAnchor: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "PersonDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/story/fact/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AssertionId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeViewerPedigree: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/family/pedigree",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "FocusPersonId",
            Key: "fpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ChangeFocusPersonId",
            Key: "cfpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SelectedNode",
            Key: "selnode",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreePersonaSelectBrowseList: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/BrowseList.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeAllComments: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/ViewAllComments.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    LegacySearchHandler: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "searchdomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/cgi-bin/sse.dll",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    CollectionImageThumbnail: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "MediaSvcDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/v2/thumbnail/namespaces/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/media/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ImageId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: ".jpg",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Constant",
            Value: "SearchUI",
            Key: "Client",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "LongestSide",
            Key: "MaxSide",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "true",
            Key: "suppressNotFound",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    SelectMePid: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/SelectMe.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SetHomePerson",
            Key: "hp",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "fti",
            Key: "fti",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: {},
        RequiresBackLink: !1
    },

    TreeFamilyGroupSheet: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/family/familygroup",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "FocusPersonId",
            Key: "fpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeMediaGalleryStory: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/story",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeMediaObjectUpload: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/upload",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "FocusPersonId",
            Key: "fpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeInvitation: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/RSVP.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "EncryptedData",
            Key: "dat",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MAC",
            Key: "mac",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonCitationDelete: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/citation/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CitationId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/delete",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreePersonaSelectPartial: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/listpersonas",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeMediaObjectAdd: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/create",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    MyCanvasPrint: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/print/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PageId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonFactMediaObjectUploadMeta: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/fact/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AssertionId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/upload/meta",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "CachedId",
            Key: "cacheid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeInviteeWelcomeModal: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/modal/inviteewelcome/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeSettingsPrivacy: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/settings/privacy",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    MediaObject: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "MyMediaDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/viewer/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ObjectId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMemberConnectContributors: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/community/contributors",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    LearnMoreSources: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/learnmore/sources.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonFactsSourceSelect: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "PersonDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/facts/source/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SourceId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    RecordIndex: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "SearchDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/cgi-bin/sse.dll",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Constant",
            Value: "1",
            Key: "indiv",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionId",
            Key: "dbid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionName",
            Key: "db",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RecordId",
            Key: "h",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SSRC",
            Key: "ssrc",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "HintId",
            Key: "hid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "GravitySearchSource",
            Key: "gss",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "true",
            Key: "usePUB",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    AggregatedPersonView: {
        UriParts: [{
            Type: "Constant",
            Value: "http://apv.ancestry.com/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "BigTreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/facts",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeMediaDownload: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/downloadmedia/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ObjectId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonPhotoUpdate: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/photo/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ObjectId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/info",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "IndexOrObjectId",
            Key: "oidx",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: "mediatype",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PageName",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreePersonaSelect: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/selectpersona",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonHintCountsJson: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/hintrequest.ashx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Constant",
            Value: "1",
            Key: "h",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ClearHints",
            Key: "ch",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    LoggedOutHomePage: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "AncestryDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    HackDayGuidePage: {
        UriParts: [{
            Type: "Constant",
            Value: "http://guide.ancestry.com/tasks/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TaskId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Constant",
            Value: "param",
            Key: "dummy",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeMediaObjectTagResult: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/tagresult",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeViewRecordRedir: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "PersonDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/ViewRecordRedir.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CitationId",
            Key: "cid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "DatabaseId",
            Key: "dbid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RecordId",
            Key: "rpid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonName",
            Key: "nam",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonAdd: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/addperson",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "OriginalTreeId",
            Key: "otid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "OriginalPersonId",
            Key: "opid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SSRC",
            Key: "ssrc",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionId",
            Key: "dbid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RecordId",
            Key: "rpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ObjectId",
            Key: "oid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreePersonaAddSelectedPopup: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/selectaddpersonapopup",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "SourceId",
            Key: "sid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "RelationType",
            Key: "rel",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "RelationshipId",
            Key: "rid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "Title",
            Key: "ttl",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "PersonIdPrimary",
            Key: "pid1",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMediaGalleryStory: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/story",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    AttachMedia: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "EvidenceType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "EvidenceId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/attach",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    MergeDuplicateUpdate: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/mergeduplicateupdate/pid1/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonIdPrimary",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pid2/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonIdDuplicate",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: [],
        FormParameters: {},
        RequiresBackLink: !1
    },

    TreeError500: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/error/500.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    CollectionSearchPage: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "SearchDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/search/db.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "CollectionId",
            Key: "dbid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreesMediaObject: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/mediax/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ObjectId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeLivingLearnMore: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/living/learnmore",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    HistoricalInsights: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "contextuidomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/historicalinsights/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "InsightSlug",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/persons/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: ":1030:",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    AggregatePersonOverview: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "APVDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AggregatePersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/overview",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "treeId",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "personid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CommonAncestorDecendancyId",
            Key: "cadid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMergeDuplicateUpdate: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/mergeduplicateupdate/pid1/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonIdPrimary",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/pid2/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonIdDuplicate",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonCitationMediaObjectAdd: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/citation/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CitationId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/create",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonCitationMediaObjectUploadMeta: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/citation/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CitationId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/upload/meta",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "CachedId",
            Key: "cacheid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonNoteDialog: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/note/dialog",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMemberConnect: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/community",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeMediaGallery: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/media",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreePhotoUpdate: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/photo/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ObjectId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/info",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "IndexOrObjectId",
            Key: "oidx",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreePersonaSelectMe: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/SelectMeSelectPerson.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonCitation: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/citation/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CitationId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonCitationMediaObjectDelete: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/citation/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CitationId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "IndexOrObjectId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/delete",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonHintCompare: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/hintcompareperson",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    AggregatePersonFacts: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "APVDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AggregatePersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/facts",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "treeId",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "personid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CommonAncestorDecendancyId",
            Key: "cadid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMemberConnectDetails: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/community/details",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeSettingsShareInvite: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/settings/sharing/invite",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonInvite: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/settings/sharing/invite",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonFactMediaObject: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/fact/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AssertionId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "IndexOrObjectId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMemberConnectGallery: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/community/gallery",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMediaGalleryAudio: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/audio",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonLifeStoryEventEdit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "PersonDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/story/fact/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AssertionId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/edit",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreePersonaSelectResearch: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/SelectPerson.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonFactCitationAdd: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/fact/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AssertionId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/citation/create",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonFactsFactSelect: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "PersonDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/facts/fact/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AssertionId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeSourceDelete: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/source/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SourceId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/delete",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonPageHintsView: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "PersonDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/hints",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "HintStatus",
            Key: "Hints.hintStatus",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeSettingsShareManage: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/settings/sharing/manageinvitees",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    GlobalSearchPage: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "SearchDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/search/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Constant",
            Value: "home",
            Key: "welcome",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreePersonaSelectTypeAhead: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/TypeAheadSelectPerson.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeMediaObject: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "IndexOrObjectId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "FocusPersonId",
            Key: "fpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMediaObjectAdd: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/create",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    GroupSearchPage: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "SearchDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/search/group/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "GroupName",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonHintList: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/hintlist",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    SaveStory: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/EditStory.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ObjectId",
            Key: "oid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: {},
        RequiresBackLink: !1
    },
    PersonFactMediaObjectUpload: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/fact/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AssertionId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/upload",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    TreeSelectMe: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/SelectMe.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SetHomePerson",
            Key: "hp",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "fti",
            Key: "fti",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },
    PersonFactMediaObjectAdd: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/fact/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AssertionId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/create",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "IndexOrObjectId",
            Key: "oidx",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    PersonMergeDuplicateLearnMore: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/mergeduplicate/learnmore",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonIdPrimary",
            Key: "pid1",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonIdDuplicate",
            Key: "pid2",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    PersonStoryEdit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/EditStory.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ObjectId",
            Key: "oid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },
    TreesList: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeOwnerType",
            Key: "type",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PageNumber",
            Key: "pn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    PersonMergeFamilyUpdate: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/mergefamilyupdate",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "HintId",
            Key: "hid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionId",
            Key: "dbid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RecordId",
            Key: "rpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SourceTreeId",
            Key: "stid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SourcePersonId",
            Key: "spid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeMergeData",
            Key: "treemergedata",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "true",
            Key: "usePUB",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    PersonAddSubmit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/addpersonsubmit",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    PersonFamilySearchCompareAndTransfer: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/fs/compareandtransfer",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    PersonHints: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/hints",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "IgnoredHintId",
            Key: "ihid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MaybeHintId",
            Key: "dhid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    RedirectToPriorSearch: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "searchdomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/search/prior",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },
    TreeViewerPedigreePrintWithFocusPerson: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/family/pedigree/print",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    TreeSettingsInfo: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/settings/info",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    TreeRepositoryEdit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/repository/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RepositoryId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/edit",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "SourceId",
            Key: "sid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RememberSourcePageData",
            Key: "css",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RememberRepositoryPageData",
            Key: "crs",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    LoggedInHomePage: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "AncestryHomeDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    PersonMilitaryPage: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/view/Military.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    BuildTreeSearch: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "searchdomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/search/RecordSearch.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SSRC",
            Key: "ssrc",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "GroupOrCategoryName",
            Key: "gl",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CategoryBucketSelector",
            Key: "tab",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },
    PersonMediaGallery: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/media",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    PersonCitationEdit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/citation/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CitationId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/edit",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    TreeSourceView: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/source/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SourceId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    PersonCitationMediaObject: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/citation/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CitationId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "IndexOrObjectId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    PersonHintsIgnored: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/hints/ignored",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },
    PersonAddEditEvent: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/event.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AddAsNew",
            Key: "addnew",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "EventId",
            Key: "eid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeSettingsShareInviteFromTree: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/settings/sharing/invitefromtree",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreePersonaAddSelected: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/selectaddpersona",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeViewerPedigreePrint: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/family/pedigree/print",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonHintListPending: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/hintlist/pending",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    AggregatePersonGallery: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "APVDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AggregatePersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/gallery",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "treeId",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "personid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CommonAncestorDecendancyId",
            Key: "cadid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeMediaGalleryPhoto: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/photo",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMatchSelect: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/PersonMatch.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: {},
        RequiresBackLink: !1
    },

    PersonCitationMediaObjectUpload: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/citation/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CitationId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/upload",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeSourceAdd: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/source/create",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RememberSourcePageData",
            Key: "css",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TestPageA: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "SearchDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/playground/pubtest/pagea",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonAllSources: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/facts/sources",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonHintListAccepted: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/hintlist/accepted",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonPrint: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/print",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonVideoSave: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/Video/SaveVideo.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "VideoId",
            Key: "videoId",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "TimeZone",
            Key: "tzo",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonComments: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/comments",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMediaObjectUploadMeta: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/upload/meta",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "CachedId",
            Key: "cacheid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "fc",
            Key: "fc",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeViewerWithFocusPerson: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/family",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    MediaSelectorComponent: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "MyMediaDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/component/selector/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/1030",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "ExcludedMediaTypes",
            Key: "exclude",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaId",
            Key: "mediaId",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SelectedMediaIds",
            Key: "selectedMediaIds",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AllowMultiSelect",
            Key: "allowMultiSelect",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaTypesFilter",
            Key: "filter",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeMediaRemove: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/removemedia/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ObjectId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeComments: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/comments",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonFactsFactEdit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "PersonDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/facts/fact/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AssertionId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/edit/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TabName",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    EditPersonSubmit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "AddPersonDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/modals/addperson/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/edit/submit",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: [],
        FormParameters: {},
        RequiresBackLink: !1
    },

    PersonVideoEdit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/Video/EditVideoInfo.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ObjectId",
            Key: "oid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonOverview: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        QueryParts: [{
            Type: "Input",
            Value: "StatusMessage",
            Key: "msg",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMemberTreeHintsAccepted: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/PersonMatch.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "m",
            Key: "src",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    AddPersonSubmit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/addpersonsubmit",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: [],
        FormParameters: {},
        RequiresBackLink: !1
    },

    UploadMediaMetaTree: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/upload/meta",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "CachedId",
            Key: "cacheid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: {},
        RequiresBackLink: !1
    },

    PersonHintListRejected: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/hintlist/rejected",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMemberConnectSuggested: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/community/potential",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    InteractiveImageViewer: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "InteractiveDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ImageId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "RecordId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "BackUrl",
            Key: "backurl",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SSRC",
            Key: "ssrc",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: "treeid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "personid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "HintId",
            Key: "hintid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RectangleCoordinates",
            Key: "rc",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PayPerViewHash",
            Key: "ppvhash",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "true",
            Key: "usePUB",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeSourceEdit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/source/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SourceId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/edit",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RememberSourcePageData",
            Key: "css",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreePersonaSelectPhoto: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/PhotoSelectPerson.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    UploadMediaMetaPerson: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/upload/meta",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "CachedId",
            Key: "cacheid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "fc",
            Key: "fc",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: {},
        RequiresBackLink: !1
    },

    PersonCitationAdd: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/citation/create",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "AddAsNew",
            Key: "addnew",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonFacts: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/facts",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeViewerFamilyView: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/family/familyview",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "FocusPersonId",
            Key: "fpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ChangeFocusPersonId",
            Key: "cfpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SelectedNode",
            Key: "selnode",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonEditTemplate: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/edit",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonViewMediaGallery: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "PersonDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/Gallery",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonHintsPending: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/hints/pending",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonRecordRedirect: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/ViewRecordRedir.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionId",
            Key: "dbid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RecordId",
            Key: "rpid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonName",
            Key: "nam",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonSiblings: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/overview/familymembers/siblings",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeMediaGalleryAudio: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/audio",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    BasicUploaderSubmit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "treesdomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/upload.file/fileupload.ashx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "MediaType",
            Key: "mediatype",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AssertionId",
            Key: "aid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CitationId",
            Key: "cid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CachedId",
            Key: "cacheid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "uatt",
            Key: "uatt",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "scsa",
            Key: "scsa",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "vism",
            Key: "vism",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "vlcid",
            Key: "vlcid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "se",
            Key: "se",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "html",
            Key: "html",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "useemsupload",
            Key: "useemsupload",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: {},
        RequiresBackLink: !1
    },

    TreeViewerFamilyViewPrintWithFocusPerson: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/familyview/print",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonFact: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/fact/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AssertionId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeInviteModal: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/settings/sharing/modalinvite",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    CurrentPersonView: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "PersonDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    UploadTree: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/UploadFile.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    MergeFamilyUpdate: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/mergefamilyupdate",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "HintId",
            Key: "hid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionId",
            Key: "dbid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RecordId",
            Key: "rpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SourceTreeId",
            Key: "stid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SourcePersonId",
            Key: "spid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeMergeData",
            Key: "treemergedata",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "true",
            Key: "usePUB",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: {},
        RequiresBackLink: !1
    },

    PersonMatch: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/PersonMatch.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeViewer: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/family",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "FocusPersonId",
            Key: "fpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "ChangeFocusPersonId",
            Key: "cfpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeMediaUploadMeta: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/upload/meta",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "CachedId",
            Key: "cacheid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMediaObjectCitationAdd: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ObjectId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/citation/create",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonEdit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/editperson.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "FocusPersonId",
            Key: "fpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CitationId",
            Key: "cid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    NewTree: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/NewTree.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeAllHints: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "HintsDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/hints/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "HintFilter",
            Key: "hf",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "HintSort",
            Key: "hs",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeLastName",
            Key: "ln",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeFirstName",
            Key: "fn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PageNumber",
            Key: "pn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionId",
            Key: "hdbid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "GroupName",
            Key: "gn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CategoryId",
            Key: "hcatid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeOverview: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/recent",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "StatusMessage",
            Key: "msg",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "SourceTreeId",
            Key: "stid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "SourcePersonId",
            Key: "spid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonCitationMediaObjectAttach: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/citation/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CitationId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/attach",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "stl",
            Key: "stl",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeMediaGalleryVideo: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/video",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonAudioEdit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/EditAudio.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ObjectId",
            Key: "oid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeFacebookGetStarted: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/facebookgetstarted",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeListOfAllPeople: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/listofallpeople",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "ShowSelect",
            Key: "ss",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "LastName",
            Key: "ln",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "FirstName",
            Key: "fn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "Rows",
            Key: "rows",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonNoteDialogEdit: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/note/editdialog",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeRepositoryView: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/repository/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RepositoryId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        QueryParts: [{
            Type: "Input",
            Value: "CitationId",
            Key: "cid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Input",
            Value: "AssertionId",
            Key: "aid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !0
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMediaGalleryPhoto: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/photo",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMediaObjectUpload: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/upload",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    MediaViewer: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "MyMediaDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/viewer/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "SaveToTreeId",
            Key: "tid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SaveToPersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "ShowImageCropping",
            Key: "imagecrop",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "DestTreeId",
            Key: "destTreeId",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "DestPersonId",
            Key: "destPersonid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    StartTree: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/StartPed.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonFactMediaAttach: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/fact/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "AssertionId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "MediaType",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/attach",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    TreeRepositoryDelete: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/repository/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RepositoryId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/delete",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonRecordSearch: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/pt/RecordSearch.aspx",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "TreeId",
            Key: "tid",
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "HintId",
            Key: "hid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionId",
            Key: "dbid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RecordId",
            Key: "rpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SSRC",
            Key: "ssrc",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMemberConnectIgnored: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !0
        }, {
            Type: "Constant",
            Value: "/community/ignored",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMergeDuplicate: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/mergeduplicate",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "PersonId",
            Key: "pid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonIdPrimary",
            Key: "pid1",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonIdDuplicate",
            Key: "pid2",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMergeFamily: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/mergefamily",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "HintId",
            Key: "hid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionId",
            Key: "dbid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RecordId",
            Key: "rpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SSRC",
            Key: "ssrc",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SourceTreeId",
            Key: "stid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SourcePersonId",
            Key: "spid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeMergeData",
            Key: "treemergedata",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PushPage",
            Key: "pgn",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "true",
            Key: "usePUB",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: [],
        FormParameters: null ,
        RequiresBackLink: !1
    },

    PersonMergeLearnMore: {
        UriParts: [{
            Type: "Constant",
            Value: "http://",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "SiteSettings",
            Value: "TreesDomain",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/tree/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "TreeId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/person/",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "PersonId",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Constant",
            Value: "/mergelearnmore",
            Key: null ,
            Optional: !1,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        QueryParts: [{
            Type: "Input",
            Value: "SourceTreeId",
            Key: "stid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "SourcePersonId",
            Key: "spid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "HintsId",
            Key: "hid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "CollectionId",
            Key: "dbid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }, {
            Type: "Input",
            Value: "RecordId",
            Key: "rpid",
            Optional: !0,
            Default: null ,
            ShouldUrlEncode: !1
        }],
        FragmentParts: null ,
        FormParameters: null ,
        RequiresBackLink: !1
    }
},

function e(t, n, r) {
    function s(o, u) {
        var a, f, l;
        if (!n[o]) {
            if (!t[o]) {
                if (a = typeof require == "function" && require,
                !u && a)
                    return a(o, !0);
                if (i)
                    return i(o, !0);
                f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND",
                f;
            }
            l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    for (var i = typeof require == "function" && require, o = 0; o < r.length; o++)
        s(r[o]);
    return s
}({
    1: [function(require, module) {
        "use strict";
        function get() {
            return {
                getPartnerId: getPartnerId,
                getUrl: getUrl,
                getFormParam: function() {
                    return null 
                },
                getQueryParam: getQueryParam
            }
        }
        function getPartnerId() {
            var override = di.get("pub-manual-partner-id"), cookie, match, partnerId;
            return override !== null  ? override : (cookie = dom.cookie,
            match = /TI=([^;]+)/.exec(cookie),
            match === null ) ? null  : (partnerId = parseInt(match[1]),
            isNaN(partnerId)) ? null  : partnerId
        }
        function getUrl() {
            return $window.location.href
        }
        function getQueryParam(key) {
            var params = decodeQueryParams($window.location.search.substring(1));
            return key in params ? params[key] : null 
        }
        function decodeQueryParams(queryString) {
            for (var match, pl = /\+/g, search = /([^&=]+)=?([^&]*)/g, decode = function(s) {
                return decodeURIComponent(s.replace(pl, " "))
            }
            , query = queryString, urlParams = {}; match = search.exec(query); )
                urlParams[decode(match[1])] = decode(match[2]);
            return urlParams
        }
        var di = require("./pub-injection")
          , dom = di.get("dom")
          , $window = di.get("dom-window");
        module.exports = {
            get: get
        }
    },
    {
        "./pub-injection": 16
    }],
    
    2: [function(require, module) {
        "use strict";
        function init() {
            var isSupported = !1, storageTest, envDomainStr, hostPrefix;
            useServerFallback = !1;
            iframeCheckPerformed = !1;
            keyCache = {};
            valueCache = {};
            queuedRequests = [];
            pendingRequests = {};
            iframeAvailable = !1;
            requestId = 0;
            iframeOrigin = null ;
            waitingRequestsByValue = {};
            waitingRequestsByKey = {};
            waitingRequestsByRequestId = {};
            requestsWaitingOnDuplicateRequest = {};
            try {
                isSupported = $window.postMessage && JSON;
                storageTest = "pageurlbrokertestlocalstorage";
                $localStorage.setItem(storageTest, storageTest);
                $localStorage.getItem(storageTest) !== storageTest && (isSupported = !1);
                $localStorage.removeItem(storageTest)
            } catch (e) {
                isSupported = !1
            }
            if (!isSupported) {
                if (startUsingFallback(),
                $window.XMLHttpRequest) {
                    envDomainStr = "";
                    hostPrefix = "PRD";
                    switch (devLevelProvider.get()) {
                    case "dev":
                    case "loc":
                        envDomainStr = "dev";
                        hostPrefix = "ACC";
                        break;
                    case "stage":
                        envDomainStr = "stage";
                        hostPrefix = "PPE"
                    }
                    var protocol = $window.location.protocol || "http:"
                      , loggingUrl = protocol + "//fel.ancestry" + envDomainStr + ".com/webapi/events"
                      , errorData = {
                        eventName: "LocalStorageUnsupported",
                        componentId: "PageUrlBrokerClient",
                        hostName: hostPrefix + "XXXXAPSPUB00",
                        eventProperties: {}
                    }
                      , request = new $window.XMLHttpRequest;
                    request.withCredentials = !0;
                    request.open("POST", loggingUrl);
                    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                    request.send(JSON.stringify(errorData))
                }
                return
            }
            iframe = $document.createElement("iframe");
            iframe.style.cssText = "position:absolute;left:-9999px;width:1px;height:1px;";
            bodyCheck()
        }
        function bodyCheck() {
            $document.body ? initIframeInBody() : setTimeout(bodyCheck, 1)
        }
        function startUsingFallback() {
            useServerFallback = !0;
            fallbackBanner.showFallbackBannerIfNeeded()
        }
        function initIframeInBody() {
            $document.body.appendChild(iframe);
            $window.addEventListener ? (iframe.addEventListener("load", iframeLoaded, !1),
            $window.addEventListener("message", function(e) {
                processMessageEvent(e)
            }, !1)) : iframe.attachEvent && (iframe.attachEvent("onload", iframeLoaded, !1),
            $window.attachEvent("onmessage", function(e) {
                processMessageEvent(e)
            }));
            var protocol = devLevelProvider.get() === "dev" ? "http:" : "https:";
            if (!0) iframeOrigin = "file:" + "./lib/tgn/x"
            else iframeOrigin = protocol + "//" + cacheDomain;
            iframe.src = iframeOrigin + "/APS_PUB/pubStorage.html?v=" + pubVersion
        }
        function sendQueuedRequests() {
            if (queuedRequests.length > 0)
                for (var i = 0; i < queuedRequests.length; ++i)
                    send(queuedRequests[i]);
            queuedRequests = null ;
            iframeAvailable = !0
        }
        function iframeLoaded() {
            iframe.contentWindow.postMessage(JSON.stringify({
                checkLocalStorage: !0
            }), iframeOrigin)
        }
        function addItem(value, callback) {
            var valueJson = JSON.stringify(value), duplicateRequestId, requestId;
            if (valueJson in keyCache)
                return callback(null , keyCache[valueJson]);
            if (valueJson in waitingRequestsByValue) {
                duplicateRequestId = waitingRequestsByValue[valueJson];
                duplicateRequestId in requestsWaitingOnDuplicateRequest || (requestsWaitingOnDuplicateRequest[duplicateRequestId] = []);
                requestsWaitingOnDuplicateRequest[duplicateRequestId].push(callback);
                return
            }
            requestId = getNextId();
            waitingRequestsByValue[valueJson] = requestId;
            waitingRequestsByRequestId[requestId] = valueJson;
            iframeAction(null , valueJson, requestId, callback)
        }
        function getItem(key, callback) {
            var duplicateRequestId, requestId;
            if (key in waitingRequestsByKey) {
                duplicateRequestId = waitingRequestsByKey[key];
                duplicateRequestId in requestsWaitingOnDuplicateRequest || (requestsWaitingOnDuplicateRequest[duplicateRequestId] = []);
                requestsWaitingOnDuplicateRequest[duplicateRequestId].push(callback);
                return
            }
            requestId = getNextId();
            waitingRequestsByKey[key] = requestId;
            iframeAction(key, null , requestId, callback)
        }
        function getItemFromServer(key, callback) {
            domainProvider.get("AncestryDomain", contextProvider.get(), function(err, domain) {
                if (err)
                    return callback(err);
                var url = "http://" + domain + "/api/pub/histories/?parentHistoryId=" + encodeURIComponent(key);
                httpClient.get(url, function(err, historiesJson) {
                    if (err)
                        return callback(err);
                    var items = JSON.parse(historiesJson);
                    Object.keys(items).forEach(function(itemKey) {
                        itemKey !== key && (valueCache[itemKey] = items[itemKey])
                    });
                    callback(null , items[key])
                })
            })
        }
        function addItemToServer(value, callback) {
            domainProvider.get("AncestryDomain", contextProvider.get(), function(err, domain) {
                if (err)
                    return callback(err);
                var url = "http://" + domain + "/api/pub/histories?returnLinkedHistories=true";
                httpClient.post(url, value, function(err, resultJson) {
                    if (err)
                        return callback(err);
                    var result = JSON.parse(resultJson)
                      , key = result.HistoryId;
                    Object.keys(result.RelatedHistories).forEach(function(itemKey) {
                        valueCache[itemKey] = result.RelatedHistories[itemKey]
                    });
                    callback(null , key)
                })
            })
        }
        function iframeAction(key, valueJson, requestId, callback) {
            var request = {
                payload: {
                    id: requestId,
                    key: key,
                    value: valueJson ? valueJson : null 
                },
                callback: callback
            };
            iframeAvailable || useServerFallback ? send(request) : queuedRequests.push(request)
        }
        function send(request) {
            pendingRequests[request.payload.id] = request;
            var key = request.payload.key;
            if (key && key in valueCache)
                return processResponse(null , {
                    id: request.payload.id,
                    item: JSON.stringify(valueCache[key])
                });
            if (useServerFallback)
                if (key) {
                    if (key in valueCache)
                        return processResponse(null , {
                            id: request.payload.id,
                            item: JSON.stringify(valueCache[key])
                        });
                    getItemFromServer(request.payload.key, function(err, item) {
                        if (err)
                            return processResponse(err);
                        processResponse(null , {
                            id: request.payload.id,
                            item: JSON.stringify(item)
                        })
                    })
                } else
                    addItemToServer(request.payload.value, function(err, key) {
                        if (err)
                            return processResponse(err);
                        processResponse(null , {
                            id: request.payload.id,
                            key: key
                        })
                    });
            else
                iframe.contentWindow.postMessage(JSON.stringify(request.payload), iframeOrigin)
        }
        function getNextId() {
            return ++requestId
        }
        function processMessageEvent(e) {
            if (!verifyOrigin(e.origin)) {
                $window.console && $window.console.warn && $window.console.warn("Received message from invalid origin: " + e.origin);
                return
            }
            var response = JSON.parse(e.data);
            if (!iframeCheckPerformed) {
                iframeCheckPerformed = !0;
                response.localStorageWorks || startUsingFallback();
                sendQueuedRequests();
                return
            }
            processResponse(null , response)
        }
        function processResponse(err, response) {
            var id = response.id, keyValue, waitingRequests, valueForKey;
            if (id in pendingRequests) {
                var value = waitingRequestsByRequestId[id]
                  , request = pendingRequests[id]
                  , key = request.payload.key;
                request.callback && (err ? callback(err) : typeof response.item != "undefined" ? (keyValue = JSON.parse(response.item),
                valueCache[request.payload.key] = keyValue,
                request.callback(null , keyValue)) : (keyCache[value] = response.key,
                request.callback(null , response.key)));
                delete pendingRequests[id];
                delete waitingRequestsByRequestId[id];
                delete waitingRequestsByValue[value];
                delete waitingRequestsByKey[key];
                id in requestsWaitingOnDuplicateRequest && (waitingRequests = requestsWaitingOnDuplicateRequest[id],
                typeof response.item != "undefined" ? (valueForKey = JSON.parse(response.item),
                waitingRequests.forEach(function(callback) {
                    err ? callback(err) : callback(null , valueForKey)
                })) : waitingRequests.forEach(function(callback) {
                    err ? callback(err) : callback(null , response.key)
                }),
                delete requestsWaitingOnDuplicateRequest[id])
            }
        }
        function verifyOrigin(origin) {
            return originRegex.test(origin)
        }
        var di = require("./pub-injection"), $window = di.get("dom-window"), $document = di.get("dom"), $localStorage = di.get("dom-localstorage"), domainProvider = di.get("domain-provider"), contextProvider = di.get("context-provider-browser"), pubVersion = di.get("pub-version-browser"), devLevelProvider = di.get("dev-level-provider"), httpClient = di.get("http-client"), fallbackBanner = di.get("fallback-banner-browser"), requestId = 0, iframeAvailable = !1, iframe = null , iframeOrigin = null , queuedRequests = [], pendingRequests = {}, useServerFallback = !1, iframeCheckPerformed = !1, keyCache = {}, valueCache = {}, waitingRequestsByValue = {}, waitingRequestsByKey = {}, waitingRequestsByRequestId = {}, requestsWaitingOnDuplicateRequest = {}, cacheDomain = null , originRegex;
        domainProvider.get("CacheDomain", null , function(err, domain) {
            cacheDomain = domain
        });
        originRegex = /c\.mfcreative(loc|dev|stage|)\.com$/i;
        module.exports = {
            addItem: addItem,
            getItem: getItem,
            init: init
        };
        $window.isPUBAutoLoadDisabled || init()
    }
    , {
        "./pub-injection": 16
    }],

    3: [function(require, module) {
        "use-strict";
        var di = require("./pub-injection")
          , devLevel = di.get("dev-level-browser");
        module.exports = {
            get: function() {
                return devLevel ? devLevel : "live"
            },
            reset: function() {
                devLevel = di.get("dev-level-browser")
            }
        }
    }
    , {
        "./pub-injection": 16
    }],

    4: [function(require, module) {
        "use strict";
        function get(callback) {
            callback(null , domainInfo)
        }
        var di = require("./pub-injection")
          , domainInfo = di.get("domain-info-browser");
        module.exports = {
            get: get
        }
    }
    , {
        "./pub-injection": 16
    }],

    5: [function(require, module) {
        "use strict";
        function get(key, context, callback) {
            var domainStr, domainIdx, partnerId;
            if (key = key.toLowerCase(),
            domainStr = "domain",
            domainIdx = key.lastIndexOf(domainStr),
            domainIdx >= 0 && domainIdx === key.length - domainStr.length && (key = key.substring(0, key.length - domainStr.length)),
            key === "cache")
                return callback(null , "c.mfcreative" + devEnvStr + ".com");
            partnerId = context.getPartnerId();
            domainInfoProvider.get(function(err, domainInfo) {
                if (err)
                    return callback(err);
                var siteDomains = domainInfo["0"]
                  , result = siteDomains.Pattern
                  , subDomain = getSubDomain(siteDomains, key);
                return subDomain ? (result = result.replace("{domain}", subDomain),
                result = result.replace(/{(\w+?)}/g, function(match, param) {
                    return param in siteDomains && partnerId in siteDomains[param] ? siteDomains[param][partnerId] : ""
                }),
                callback(null , result)) : callback(null , null )
            })
        }
        function getSubDomain(siteDomains, key) {
            return "StandardDomains" in siteDomains && siteDomains.StandardDomains.indexOf(key) != -1 ? key : "MappedDomains" in siteDomains && key in siteDomains.MappedDomains ? siteDomains.MappedDomains[key] : null 
        }
        var di = require("./pub-injection"), devLevelProvider = di.get("dev-level-provider"), domainInfoProvider = di.get("domain-info-provider"), devEnvDomainStrings, devEnvStr;
        module.exports = {
            get: get
        };
        devEnvDomainStrings = {
            loc: "dev",
            dev: "dev",
            stage: "stage",
            live: ""
        };
        devEnvStr = devEnvDomainStrings[devLevelProvider.get()]
    }
    , {
        "./pub-injection": 16
    }],

    6: [function(require, module) {
        "use strict";
        var memoryFileSystem = {};
        module.exports = {
            write: function(fileName, contents, callback) {
                memoryFileSystem[fileName] = contents;
                callback(null )
            },
            read: function(fileName, callback) {
                fileName in memoryFileSystem ? callback(null , memoryFileSystem[fileName]) : callback("File not found")
            },
            clear: function() {
                memoryFileSystem = {}
            }
        }
    }
    , {}],

    7: [function(require, module) {
        "use strict";
        function attach() {
            $document.addEventListener("DOMContentLoaded", findAndExecuteCommands)
        }
        function findAndExecuteCommands() {
            var callback = null ;
            executeCommandsForElements($document, "a", "href", !1, callback);
            executeCommandsForElements($document, "form", "action", !0, callback)
        }
        function executeCommandsForElements(tagContainer, tagName, attrName, addHiddenInputs, callback) {
            var tagsHtmlContainer = tagContainer.getElementsByTagName(tagName), tagsProcessed, tags, i;
            if (tagsHtmlContainer) {
                if (tagsHtmlContainer.length === 0)
                    return callback ? callback() : void 0;
                for (tagsProcessed = 0,
                tags = [],
                i = 0; i < tagsHtmlContainer.length; i++)
                    tags.push(tagsHtmlContainer[i]);
                tags.forEach(function(tag) {
                    var url = tag.getAttribute(attrName), command;
                    if (url === null  || (command = readCommand(url),
                    !command))
                        return (tagsProcessed++,
                        tagsProcessed === tags.length && callback) ? callback() : void 0;
                    url = removeFragmentQueryParam(url, PageHistoryParams.Command);
                    processCommand(url, command, addHiddenInputs, function(err, requestMetadata) {
                        var key, element;
                        if (url = requestMetadata.Url,
                        url === null  && (url = addHiddenInputs ? "" : "javascript:void(0)"),
                        tag.setAttribute(attrName, url),
                        addHiddenInputs && requestMetadata.FormParameters)
                            for (key in requestMetadata.FormParameters)
                                element = $document.createElement("input"),
                                element.setAttribute("type", "hidden"),
                                element.setAttribute("name", key),
                                element.setAttribute("value", requestMetadata.FormParameters[key]),
                                tag.appendChild(element);
                        tagsProcessed++;
                        tagsProcessed === tags.length && callback && callback()
                    })
                })
            }
        }
        function rectifyElement(element, callback) {
            var callbackWrapper = null 
              , totalCalls = 0;
            callback && (callbackWrapper = function() {
                totalCalls++;
                totalCalls === 2 && callback()
            }
            );
            executeCommandsForElements(element, "a", "href", !1, callbackWrapper);
            executeCommandsForElements(element, "form", "action", !0, callbackWrapper)
        }
        function rectifyUrl(url, callback) {
            var command = readCommand(url);
            if (!command)
                return callback(null , url);
            url = removeFragmentQueryParam(url, PageHistoryParams.Command);
            processCommand(url, command, !1, function(err, requestMetadata) {
                if (err)
                    return callback(err);
                var result = requestMetadata.Url;
                if (result === null )
                    return callback(new Error("URL could not be rectified."));
                callback(null , result)
            })
        }
        function rectifyPostUrl(url, callback) {
            var command = readCommand(url);
            if (!command)
                return callback(null , {
                    Url: url,
                    FormParameters: {}
                });
            url = removeFragmentQueryParam(url, PageHistoryParams.Command);
            processCommand(url, command, !0, function(err, requestMetadata) {
                if (err)
                    return callback(err);
                if (requestMetadata.Url === null )
                    return callback(new Error("URL could not be rectified."));
                callback(null , requestMetadata)
            })
        }
        function processCommand(url, command, isForm, callback) {
            var commandName = command.name
              , args = command.args;
            switch (commandName) {
            case "a":
                urlInfoRepository.getUrlInfo(args[0], function(getUrlInfoErr, urlInfo) {
                    var startTask, taskName;
                    if (getUrlInfoErr)
                        return callback(getUrlInfoErr);
                    startTask = args[2];
                    typeof startTask == "boolean" ? (taskName = startTask ? PageHistoryParams.DefaultTask : null ,
                    historyParamProvider.get(args[0], urlInfo, args[1], null , null , taskName, args[3], contextProvider.get(), function(err, historyParams) {
                        return err ? callback(err) : createUrlAndFormParameters(historyParams, url, isForm, callback)
                    })) : typeof startTask == "string" ? historyParamProvider.get(args[0], urlInfo, args[1], null , null , args[2], args[3], contextProvider.get(), function(err, historyParams) {
                        return err ? callback(err) : createUrlAndFormParameters(historyParams, url, isForm, callback)
                    }) : historyParamProvider.get(args[0], urlInfo, args[1], args[2], args[3], args[4], args[5], contextProvider.get(), function(err, historyParams) {
                        return err ? callback(err) : createUrlAndFormParameters(historyParams, url, isForm, callback)
                    })
                });
                break;
            case "l":
                historyParamProvider.get(null , null , null , null , null , null , args[0], contextProvider.get(), function(err, historyParams) {
                    return err ? callback(err) : createUrlAndFormParameters(historyParams, url, isForm, callback)
                });
                break;
            case "r":
                return createUrlAndFormParameters({
                    usePUBJs: "true"
                }, url, isForm, callback);
            case "b":
                prevUrlProvider.getBack(args[0], contextProvider.get(), function(err, backUrl) {
                    if (err)
                        return callback(err);
                    callback(null , {
                        Url: backUrl
                    })
                });
                break;
            case "s":
                prevUrlProvider.getStart(args[0], contextProvider.get(), function(err, startUrl) {
                    if (err)
                        return callback(err);
                    callback(null , {
                        Url: startUrl
                    })
                }, args[1])
            }
        }
        function createUrlAndFormParameters(historyParams, url, isForm, callback) {
            var usePUBJs, source, start;
            if (historyParams && (usePUBJs = historyParams.usePUBJs,
            usePUBJs && (url = addQueryParam(url, "usePUBJs", usePUBJs)),
            source = historyParams[PageHistoryParams.Source],
            source && (url = addQueryParam(url, PageHistoryParams.Source, source)),
            start = historyParams[PageHistoryParams.StartTask],
            start && (url = addQueryParam(url, PageHistoryParams.StartTask, start))),
            isForm)
                return prevUrlProvider.getBack(null , contextProvider.get(), function(err, backUrl) {
                    return err ? callback(err) : prevUrlProvider.getStarts(contextProvider.get(), function(err, startUrls) {
                        if (err)
                            return callback(err);
                        var formParams = {};
                        return formParams[PageHistoryParams.FormBackUrl] = backUrl ? backUrl : "",
                        Object.keys(startUrls).forEach(function(taskName) {
                            formParams[PageHistoryParams.FormStartUrlPrefix + taskName] = startUrls[taskName]
                        }),
                        callback(null , {
                            Url: url,
                            FormParameters: formParams
                        })
                    })
                });
            callback(null , {
                Url: url
            })
        }
        function readCommand(url) {
            var commandRegex = new RegExp(PageHistoryParams.Command + "=[^&]+"), match = commandRegex.exec(url), commandStr, command, args, remainder, argStrings;
            return match ? (commandStr = match[0],
            command = {},
            command.name = commandStr.substring(PageHistoryParams.Command.length + 1, PageHistoryParams.Command.length + 2),
            args = [],
            remainder = commandStr.substring(PageHistoryParams.Command.length + 3, commandStr.length - 1),
            remainder.length > 0 && (argStrings = separateArgStrings(remainder),
            argStrings.forEach(function(argStr) {
                argStr.indexOf("(") === 0 && (argStr = "{" + argStr.substring(1, argStr.length - 1) + "}");
                argStr = decodeURIComponent(argStr);
                argStr = argStr.replace(/('|[^\\]')/g, function(c) {
                    return c.length == 1 ? '"' : c.substring(0, 1) + '"'
                });
                var arg = JSON.parse(argStr);
                args.push(arg)
            })),
            command.args = args,
            command) : null 
        }
        function separateArgStrings(argsString) {
            for (var commaIdx = argsString.indexOf(","), result = [], arg, match; argsString.length > 0; ) {
                if (argsString.charAt(0) === "(") {
                    argsString = argsString.substring(1);
                    arg = "(";
                    do
                        match = /^'(\\'|[^'])*?'./.exec(argsString),
                        match && (argsString = argsString.substring(match[0].length),
                        arg += match[0]);
                    while (match);result.push(arg)
                } else
                    commaIdx === -1 ? (result.push(argsString),
                    argsString = "") : (result.push(argsString.substring(0, commaIdx)),
                    argsString = argsString.substring(commaIdx + 1));
                commaIdx = argsString.indexOf(",");
                commaIdx === 0 && (argsString = argsString.substring(1),
                commaIdx = argsString.indexOf(","))
            }
            return result
        }
        function removeFragmentQueryParam(url) {
            var hashIdx = url.indexOf("#"), preFragment, fragment, fragHookIdx;
            return hashIdx == -1 ? url : (preFragment = url.substring(0, hashIdx),
            fragment = url.substring(hashIdx + 1),
            fragment = fragment.replace(new RegExp(PageHistoryParams.Command + "=[^&]+"), ""),
            fragHookIdx = fragment.indexOf("?"),
            fragHookIdx != -1 && fragHookIdx == fragment.lastIndexOf("?") && (fragment = fragment.substring(0, fragment.length - 1)),
            preFragment + fragment)
        }
        function addQueryParam(url, key, value) {
            var hashIdx = url.indexOf("#")
              , preFragment = hashIdx == -1 ? url : url.substring(0, hashIdx)
              , fragment = hashIdx == -1 ? "" : url.substring(hashIdx)
              , hookIdx = url.indexOf("?")
              , prefix = hookIdx == -1 ? "?" : "&";
            return preFragment + prefix + key + "=" + value + fragment
        }
        var di = require("./pub-injection")
          , $document = di.get("dom")
          , historyParamProvider = di.get("history-param-provider")
          , prevUrlProvider = di.get("prev-url-provider")
          , contextProvider = di.get("context-provider-browser")
          , PageHistoryParams = di.get("page-history-params")
          , urlInfoRepository = di.get("url-info-repository");
        module.exports = {
            attach: attach,
            rectifyUrl: rectifyUrl,
            rectifyPostUrl: rectifyPostUrl,
            rectifyElement: rectifyElement
        };
        attach()
    }
    , {
        "./pub-injection": 16
    }],

    8: [function(require, module) {
        "use strict";
        function get(currentPageName, currentUrlInfo, currentInputs, extraQueryParams, extraFragmentParams, taskName, destIsPostPage, context, callback) {
            var usePubJsInjectorCb = function(err, queryParams, fragmentParams, postParams) {
                return err ? callback(err, queryParams, fragmentParams, postParams) : (queryParams || (queryParams = {}),
                queryParams.usePUBJs = "true",
                callback(err, queryParams, fragmentParams, postParams))
            }
              , getInternal = function(err, postParams) {
                if (err)
                    return usePubJsInjectorCb(err);
                if (!currentPageName)
                    return maintainHistoryFromPrevious(postParams, context, usePubJsInjectorCb);
                var pageCurrentId = context.getQueryParam(PageHistoryParams.Target);
                return pageCurrentId ? findHistoryFromTarget(pageCurrentId, currentPageName, currentUrlInfo, currentInputs, extraQueryParams, extraFragmentParams, taskName, destIsPostPage, postParams, context, usePubJsInjectorCb) : createHistoryAndAdd(currentPageName, currentUrlInfo, currentInputs, extraQueryParams, extraFragmentParams, taskName, destIsPostPage, postParams, context, usePubJsInjectorCb)
            }
            ;
            return !destIsPostPage || taskName ? getInternal(null , null ) : populatePostParams(context, getInternal)
        }
        function findHistoryFromTarget(pageCurrentId, currentPageName, currentUrlInfo, currentInputs, extraQueryParams, extraFragmentParams, taskName, destIsPostPage, postParams, context, callback) {
            var result;
            return historyRepository.get(pageCurrentId, function(histRepoErr, targetHistory) {
                if (histRepoErr)
                    return callback(histRepoErr);
                return urlBuilder.buildUrlWithUrlInfo(currentPageName, currentUrlInfo, currentInputs, null , null , postParams, context, function(err, urlParameters) {
                    var url, backUrl, historyTaskName, startHistoryId;
                    if (err)
                        return callback(err);
                    if (url = urlParameters.Url,
                    targetHistory && url === targetHistory.Url) {
                        if (result = {},
                        result[PageHistoryParams.Source] = pageCurrentId,
                        taskName && (result[PageHistoryParams.StartTask] = taskName),
                        destIsPostPage) {
                            if (postParams || (postParams = {}),
                            backUrl = addQueryParam(url, PageHistoryParams.Target, pageCurrentId),
                            postParams[PageHistoryParams.FormBackUrl] = {
                                InputName: PageHistoryParams.FormBackUrl,
                                Optional: !1,
                                IsFile: !1,
                                Value: backUrl
                            },
                            targetHistory.Starts) {
                                var startsComplete = 0
                                  , numStarts = Object.keys(targetHistory.Starts).length
                                  , historyError = null ;
                                for (historyTaskName in targetHistory.Starts)
                                    startHistoryId = targetHistory.Starts[historyTaskName],
                                    historyRepository.get(startHistoryId, function(historyRepoErr, startHistory) {
                                        return startsComplete++,
                                        historyRepoErr && (historyError = historyRepoErr),
                                        postParams[PageHistoryParams.FormStartUrlPrefix + historyTaskName] = {
                                            InputName: PageHistoryParams.FormStartUrlPrefix + historyTaskName,
                                            Optional: !1,
                                            IsFile: !1,
                                            Value: addQueryParam(startHistory.Url, PageHistoryParams.Target, startHistoryId)
                                        },
                                        startsComplete === numStarts ? historyRepoErr ? callback(historyError) : (taskName && (postParams[PageHistoryParams.FormStartUrlPrefix + taskName] = {
                                            InputName: PageHistoryParams.FormStartUrlPrefix + taskName,
                                            Optional: !1,
                                            IsFile: !1,
                                            Value: backUrl
                                        }),
                                        callback(null , result, null , postParams)) : void 0
                                    });
                                return
                            }
                            return taskName && (postParams[PageHistoryParams.FormStartUrlPrefix + taskName] = {
                                InputName: PageHistoryParams.FormStartUrlPrefix + taskName,
                                Optional: !1,
                                IsFile: !1,
                                Value: backUrl
                            }),
                            callback(null , result, null , postParams)
                        }
                        return callback(null , result, null , postParams)
                    }
                    return createHistoryAndAdd(currentPageName, currentUrlInfo, currentInputs, extraQueryParams, extraFragmentParams, taskName, destIsPostPage, postParams, context, callback)
                })
            })
        }
        function addQueryParam(url, key, value) {
            var hashIdx = url.indexOf("#")
              , preFragment = hashIdx == -1 ? url : url.substring(0, hashIdx)
              , fragment = hashIdx == -1 ? "" : url.substring(hashIdx)
              , hookIdx = url.indexOf("?")
              , prefix = hookIdx == -1 ? "?" : "&";
            return preFragment + prefix + key + "=" + value + fragment
        }
        function maintainHistoryFromPrevious(postParams, context, callback) {
            var result, passthroughId = context.getQueryParam(PageHistoryParams.Source), passThroughStart, targetId;
            return passthroughId ? (result = {},
            result[PageHistoryParams.Source] = passthroughId,
            passThroughStart = context.getQueryParam(PageHistoryParams.StartTask),
            passThroughStart && (result[PageHistoryParams.StartTask] = passThroughStart),
            callback(null , result, null , postParams)) : (targetId = context.getQueryParam(PageHistoryParams.Target),
            targetId) ? historyRepository.get(targetId, function(err, targetHistory) {
                return err || targetHistory == null  ? callback(null , {}, null , null ) : (result = {},
                targetHistory.Prev && (result[PageHistoryParams.Source] = targetHistory.Prev),
                callback(null , result, null , postParams))
            }) : callback(null , {}, null , postParams)
        }
        function createHistoryAndAdd(currentPageName, currentUrlInfo, currentInputs, extraQueryParams, extraFragmentParams, taskName, destIsPostPage, postParams, context, callback) {
            var passThroughData = extraQueryParams
              , fragmentPassThroughData = extraFragmentParams;
            return urlBuilder.buildUrlWithUrlInfo(currentPageName, currentUrlInfo, currentInputs, passThroughData, fragmentPassThroughData, postParams, context, function(err, urlParameters) {
                if (err)
                    return callback(err);
                if (currentUrlInfo.FormParameters)
                    return callback(new Error("The " + currentPageName + " page contains form parameters, and therefore cannot be added to the page history"));
                createHistoryWithUrlAndAdd(urlParameters.Url, taskName, destIsPostPage, postParams, context, callback)
            })
        }
        function createHistoryWithUrlAndAdd(url, taskName, destIsPostPage, postParams, context, callback) {
            var historyItem = {
                Url: url
            }, pageSourceId = context.getQueryParam(PageHistoryParams.Source), startTask;
            return (pageSourceId && (historyItem.Prev = pageSourceId),
            startTask = context.getQueryParam(PageHistoryParams.StartTask),
            pageSourceId) ? (historyRepository.get(pageSourceId, function(err, sourceHistory) {
                if (err)
                    return callback(err);
                sourceHistory && sourceHistory.Starts && (historyItem.Starts = sourceHistory.Starts)
            }),
            finishHistoryAndAdd(pageSourceId, historyItem, startTask, taskName, destIsPostPage, postParams, callback)) : finishHistoryAndAdd(pageSourceId, historyItem, startTask, taskName, destIsPostPage, postParams, callback)
        }
        function finishHistoryAndAdd(pageSourceId, historyItem, startTask, taskName, destIsPostPage, postParams, callback) {
            startTask && pageSourceId && (historyItem.Starts || (historyItem.Starts = {}),
            historyItem.Starts[startTask] = pageSourceId);
            addHistoryItemOrLookupId(historyItem, function(err, newHistoryId) {
                var result, backUrl;
                return err ? callback(err) : (result = {},
                result[PageHistoryParams.Source] = newHistoryId,
                taskName && (result[PageHistoryParams.StartTask] = taskName),
                destIsPostPage && historyItem.Url && (postParams || (postParams = {}),
                backUrl = addQueryParam(historyItem.Url, PageHistoryParams.Target, newHistoryId),
                postParams[PageHistoryParams.FormBackUrl] = {
                    InputName: PageHistoryParams.FormBackUrl,
                    Optional: !1,
                    IsFile: !1,
                    Value: backUrl
                },
                taskName && (postParams[PageHistoryParams.FormStartUrlPrefix + taskName] = {
                    InputName: PageHistoryParams.FormStartUrlPrefix + taskName,
                    Optional: !1,
                    IsFile: !1,
                    Value: backUrl
                })),
                callback(null , result, null , postParams))
            })
        }
        function addHistoryItemOrLookupId(historyItem, callback) {
            historyRepository.add(historyItem, function(err, newHistoryId) {
                if (err)
                    return callback(err);
                callback(null , newHistoryId)
            })
        }
        function populatePostParams(context, callback) {
            return prevUrlProvider.getBack(null , context, function(backUrlErr, backUrl) {
                if (backUrlErr)
                    return callback(backUrlErr, null );
                prevUrlProvider.getStarts(context, function(startUrlsErr, startUrls) {
                    var postParams, taskName;
                    if (startUrlsErr)
                        return callback(startUrlsErr, null );
                    postParams = {};
                    postParams[PageHistoryParams.FormBackUrl] = {
                        InputName: PageHistoryParams.FormBackUrl,
                        Optional: !1,
                        IsFile: !1,
                        Value: backUrl || ""
                    };
                    for (taskName in startUrls)
                        postParams[PageHistoryParams.FormStartUrlPrefix + taskName] = {
                            InputName: PageHistoryParams.FormStartUrlPrefix + taskName,
                            Optional: !1,
                            IsFile: !1,
                            Value: startUrls[taskName]
                        };
                    return callback(null , postParams)
                })
            })
        }
        var di = require("./pub-injection")
          , historyRepository = di.get("history-repository")
          , urlBuilder = di.get("url-builder")
          , PageHistoryParams = di.get("page-history-params")
          , prevUrlProvider = di.get("prev-url-provider");
        module.exports = {
            get: get
        }
    }
    , {
        "./pub-injection": 16
    }],

    9: [function(require, module) {
        "use strict";
        function add(historyItem, callback) {
            storage.addItem(historyItem, callback)
        }
        function get(historyId, callback) {
            storage.getItem(historyId, callback)
        }
        var di = require("./pub-injection")
          , storage = di.get("cross-domain-storage");
        module.exports = {
            add: add,
            get: get
        }
    }
    , {
        "./pub-injection": 16
    }],

    10: [function(require, module) {
        "use strict";
        module.exports = {
            get: function(url, callback) {
                var xhr = new XMLHttpRequest;
                xhr.withCredentials = !0;
                xhr.open("GET", url, !0);
                xhr.setRequestHeader("Accept", "application/json,text/plain,text/html");
                xhr.onload = function() {
                    xhr.readyState === 4 && callback(null , xhr.responseText)
                }
                ;
                xhr.onerror = function() {
                    callback(xhr.status + " " + xhr.statusText)
                }
                ;
                xhr.send()
            },
            post: function(url, body, callback) {
                var xhr = new XMLHttpRequest;
                xhr.withCredentials = !0;
                xhr.open("POST", url, !0);
                xhr.setRequestHeader("Accept", "application/json,text/plain,text/html");
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.onload = function() {
                    xhr.readyState === 4 && callback(null , xhr.responseText)
                }
                ;
                xhr.onerror = function() {
                    callback(xhr.status + " " + xhr.statusText)
                }
                ;
                xhr.send(body)
            }
        }
    }
    , {}],

    11: [function(require, module) {
        "use strict";
        var DefaultTaskName = "default"
          , FormStartUrlPrefix = "_phstarturl";
        module.exports = {
            Source: "_phsrc",
            Target: "_phtarg",
            StartTask: "_phstart",
            DefaultTask: DefaultTaskName,
            Command: "_phcmd",
            GetBackUrlCommand: "b",
            GetStartUrlCommand: "s",
            AddHistoryCommand: "a",
            LookupCommand: "l",
            RectifyCommand: "r",
            FormStartUrlPrefix: FormStartUrlPrefix,
            FormStartUrl: FormStartUrlPrefix + DefaultTaskName,
            FormBackUrl: "_phbackurl"
        }
    }
    , {}],

    12: [function(require, module) {
        function build(builder, destPageName, options, callback) {
            var currentPageInfo = module.exports.currentPageInfo
              , destInputs = null 
              , passThroughParameters = null 
              , currentPageName = null 
              , currentInputs = null 
              , extraQueryParams = null 
              , extraFragmentParams = null 
              , taskName = null 
              , noHistory = !1;
            if (options) {
                if (destInputs = options.destInputs,
                passThroughParameters = options.passThroughParameters,
                options.useCurrentPageInfo)
                    if (currentPageInfo)
                        currentPageName = currentPageInfo.pageName,
                        currentInputs = currentPageInfo.inputs,
                        extraQueryParams = currentPageInfo.extraQueryParams,
                        extraFragmentParams = currentPageInfo.extraFragmentParams;
                    else
                        throw new Error("ancestry.pub.setCurrentPage() not called and tried to create url to go back to current page.");
                else
                    currentPageName = options.currentPageName,
                    currentInputs = options.currentInputs || null ,
                    extraQueryParams = options.extraQueryParams || null ,
                    extraFragmentParams = options.extraFragmentParams || null ;
                options.currentPageIsStart && (taskName = PageHistoryParams.DefaultTask);
                noHistory = options.noHistory
            }
            builder = builder.toGoTo(destPageName, destInputs, passThroughParameters);
            noHistory && (builder = builder.withoutHistory());
            currentPageName && (builder = builder.toComeBackTo(currentPageName, currentInputs, extraQueryParams, extraFragmentParams, taskName));
            builder.build(callback)
        }
        function getBuilder(withoutHistoryFunction, withHistoryFunction) {
            var destPageName = null 
              , destInputs = null 
              , passThroughParameters = null 
              , currentPageName = null 
              , currentInputs = null 
              , extraQueryParams = null 
              , extraFragmentParams = null 
              , taskName = null 
              , noHistory = !1
              , callback = null 
              , pubModule = module.exports
              , builder = {};
            return builder.toGoTo = function(pageName, inputs, passThrough) {
                return destPageName = pageName || null ,
                destInputs = inputs || null ,
                passThroughParameters = passThrough || null ,
                this
            }
            ,
            builder.toComeBackTo = function(pageName, inputs, extraQuery, extraFragment, task) {
                return currentPageName = pageName || null ,
                currentInputs = inputs || null ,
                extraQuery === !0 ? taskName = PageHistoryParams.DefaultTask : (extraFragmentParams = extraFragment,
                extraQueryParams = extraQuery,
                taskName = task === !0 ? PageHistoryParams.DefaultTask : task),
                this
            }
            ,
            builder.toComeBackToCurrent = function(task) {
                if (pubModule.currentPageInfo)
                    currentPageName = pubModule.currentPageInfo.pageName || null ,
                    currentInputs = pubModule.currentPageInfo.inputs || null ,
                    extraQueryParams = pubModule.currentPageInfo.extraQueryParams || null ,
                    extraFragmentParams = pubModule.currentPageInfo.extraFragmentParams || null ,
                    taskName = task === !0 ? PageHistoryParams.DefaultTask : task || null ;
                else
                    throw new Error("ancestry.pub.setCurrentPage() not called and tried to create url to go back to current page. If this is from an embeddable component/widget, the page hosting the component needs to call ancestry.pub.setCurrentPage().");
                return this
            }
            ,
            builder.withoutHistory = function() {
                return noHistory = !0,
                this
            }
            ,
            builder.build = function(cb) {
                if (callback = cb,
                noHistory && currentPageName)
                    throw new Error("Current page name added, but the noHistory option as set to true.");
                noHistory ? withoutHistoryFunction(destPageName, destInputs, passThroughParameters, contextProvider.get(), callback) : withHistoryFunction({
                    destPageName: destPageName,
                    destInputs: destInputs,
                    passThroughParameters: passThroughParameters,
                    currentPageName: currentPageName,
                    currentInputs: currentInputs,
                    extraQueryParams: extraQueryParams,
                    extraFragmentParams: extraFragmentParams,
                    taskName: taskName,
                    context: contextProvider.get()
                }, callback)
            }
            ,
            builder
        }
        var di = require("./pub-injection")
          , pubInternal = di.get("page-url-broker")
          , scraper = di.get("history-command-scraper")
          , contextProvider = di.get("context-provider-browser")
          , PageHistoryParams = di.get("page-history-params");
        module.exports.currentPageInfo = null ;
        module.exports.setCurrentPage = function(currentPageName, currentInputs, extraQueryParams, extraFragmentParams) {
            var self = this;
            self.currentPageInfo = {};
            self.currentPageInfo.pageName = currentPageName;
            self.currentPageInfo.inputs = currentInputs;
            self.currentPageInfo.extraQueryParams = extraQueryParams;
            self.currentPageInfo.extraFragmentParams = extraFragmentParams
        }
        ;
        module.exports.getStartUrl = function(taskName, callback) {
            typeof taskName == "string" ? pubInternal.getStartUrlForTask(taskName, null , contextProvider.get(), callback) : (callback = taskName,
            pubInternal.getStartUrl(null , contextProvider.get(), callback))
        }
        ;
        module.exports.getBackUrl = function(callback) {
            pubInternal.getBackUrl(null , contextProvider.get(), callback)
        }
        ;
        module.exports.getUrl = function(destPageName, options, callback) {
            return build(this.buildUrl(), destPageName, options, callback)
        }
        ;
        module.exports.buildUrl = function() {
            return getBuilder(pubInternal.getUrl, pubInternal.getUrlWithHistory)
        }
        ;
        module.exports.getPostUrl = function(destPageName, options, callback) {
            return build(this.buildPostUrl(), destPageName, options, callback)
        }
        ;
        module.exports.buildPostUrl = function() {
            return getBuilder(pubInternal.getPostUrl, pubInternal.getPostUrlWithHistory)
        }
        ;
        module.exports.rectifyUrl = function(url, callback) {
            return scraper.rectifyUrl(url, callback)
        }
        ;
        module.exports.rectifyPostUrl = function(url, callback) {
            return scraper.rectifyPostUrl(url, callback)
        }
        ;
        module.exports.rectifyElement = function(element, callback) {
            return scraper.rectifyElement(element, callback)
        }
    }
    , {
        "./pub-injection": 16
    }],

    13: [function(require, module) {
        "use strict";
        function getUrl(destPageName, destInputs, passThroughParameters, context, callback) {
            getUrlInternal(destPageName, destInputs, passThroughParameters, null , context, callback)
        }
        function getUrlWithHistory(options, callback) {
            var destPageName, destInputs, passThroughParameters, currentPageName, currentInputs, extraQueryParams, extraFragmentParams, context, taskName, currentPageIsStart;
            arguments.length >= 8 ? (destPageName = arguments[0],
            destInputs = arguments[1],
            passThroughParameters = arguments[2],
            currentPageName = arguments[3],
            currentInputs = arguments[4],
            extraQueryParams = null ,
            extraFragmentParams = null ,
            currentPageIsStart = arguments[5],
            taskName = currentPageIsStart ? PageHistoryParams.DefaultTask : null ,
            context = arguments[6],
            callback = arguments[7]) : (destPageName = options.destPageName,
            destInputs = options.destInputs || null ,
            passThroughParameters = options.passThroughParameters || null ,
            currentPageName = options.currentPageName || null ,
            currentInputs = options.currentInputs || null ,
            extraQueryParams = options.extraQueryParams || null ,
            extraFragmentParams = options.extraFragmentParams || null ,
            taskName = options.taskName || null ,
            context = options.context);
            urlInfoRepository.getUrlInfo(destPageName, function(destErr, destUrlInfo) {
                return destErr ? doCallback(callback, destErr, null ) : currentPageName ? urlInfoRepository.getUrlInfo(currentPageName, function(curErr, curUrlInfo) {
                    return curErr ? doCallback(callback, curErr, null ) : getUrlWithHistoryWithUrlInfo(destPageName, destUrlInfo, destInputs, passThroughParameters, currentPageName, curUrlInfo, currentInputs, extraQueryParams, extraFragmentParams, taskName, context, callback)
                }) : getUrlWithHistoryWithUrlInfo(destPageName, destUrlInfo, destInputs, passThroughParameters, null , null , null , null , null , null , context, callback)
            })
        }
        function getPostUrl(destPageName, destInputs, passThroughParameters, context, callback) {
            getPostUrlInternal(destPageName, destInputs, passThroughParameters, null , context, callback)
        }
        function getPostUrlWithHistory(options, callback) {
            var destPageName, destInputs, passThroughParameters, currentPageName, currentInputs, extraQueryParams, extraFragmentParams, context, taskName, currentPageIsStart;
            arguments.length >= 8 ? (destPageName = arguments[0],
            destInputs = arguments[1],
            passThroughParameters = arguments[2],
            currentPageName = arguments[3],
            currentInputs = arguments[4],
            extraQueryParams = null ,
            extraFragmentParams = null ,
            currentPageIsStart = arguments[5],
            taskName = currentPageIsStart ? PageHistoryParams.DefaultTask : null ,
            context = arguments[6],
            callback = arguments[7]) : (destPageName = options.destPageName,
            destInputs = options.destInputs || null ,
            passThroughParameters = options.passThroughParameters || null ,
            currentPageName = options.currentPageName || null ,
            currentInputs = options.currentInputs || null ,
            extraQueryParams = options.extraQueryParams || null ,
            extraFragmentParams = options.extraFragmentParams || null ,
            taskName = options.taskName || null ,
            context = options.context);
            urlInfoRepository.getUrlInfo(destPageName, function(destErr, destUrlInfo) {
                return destErr ? doCallback(callback, destErr, null ) : (currentPageName && urlInfoRepository.getUrlInfo(currentPageName, function(curErr, curUrlInfo) {
                    return curErr ? doCallback(callback, curErr, null ) : getPostUrlWithHistoryWithUrlInfo(destPageName, destUrlInfo, destInputs, passThroughParameters, currentPageName, curUrlInfo, currentInputs, extraQueryParams, extraFragmentParams, taskName, context, callback)
                }),
                getPostUrlWithHistoryWithUrlInfo(destPageName, destUrlInfo, destInputs, passThroughParameters, null , null , null , null , null , null , context, callback))
            })
        }
        function getBackUrl(fallback, context, callback) {
            prevUrlProvider.getBack(fallback, context, function(err, url) {
                if (err)
                    return doCallback(callback, err);
                doCallback(callback, null , url)
            })
        }
        function getStartUrl(fallback, context, callback) {
            prevUrlProvider.getStart(fallback, context, function(err, url) {
                if (err)
                    return doCallback(callback, err);
                doCallback(callback, null , url)
            })
        }
        function getStartUrlForTask(taskName, fallback, context, callback) {
            prevUrlProvider.getStart(fallback, context, function(err, url) {
                if (err)
                    return doCallback(callback, err);
                doCallback(callback, null , url)
            }, taskName)
        }
        function doCallback(callback, error, result) {
            typeof callback == "object" ? callback.invoke(error ? error.message || error.toString() : null , result) : callback(error, result)
        }
        function getUrlInternal(destPageName, destInputs, passThroughParameters, fragmentPassthroughParameters, context, callback) {
            urlInfoRepository.getUrlInfo(destPageName, function(err, urlInfo) {
                if (err)
                    return doCallback(callback, err, null );
                getUrlWithUrlInfo(destPageName, urlInfo, destInputs, passThroughParameters, fragmentPassthroughParameters, context, callback)
            })
        }
        function getUrlWithUrlInfo(destPageName, destUrlInfo, destInputs, passThroughParameters, fragmentPassthroughParameters, context, callback) {
            destInputs = destInputs || null ;
            passThroughParameters = passThroughParameters || null ;
            fragmentPassthroughParameters = fragmentPassthroughParameters || null ;
            urlBuilder.buildUrlWithUrlInfo(destPageName, destUrlInfo, destInputs, passThroughParameters, fragmentPassthroughParameters, null , context, function(err, result) {
                if (err)
                    return doCallback(callback, err, null );
                if (result.Parameters != null )
                    return doCallback(callback, new Error("The requested page name (" + destPageName + ") requires HTTP POST parameters."), null );
                doCallback(callback, null , result.Url)
            })
        }
        function getUrlWithHistoryWithUrlInfo(destPageName, destUrlInfo, destInputs, passThroughParameters, currentPageName, curUrlInfo, currentInputs, extraQueryParams, extraFragmentParams, taskName, context, callback) {
            historyParamProvider.get(currentPageName, curUrlInfo, currentInputs, extraQueryParams, extraFragmentParams, taskName, !1, context, function(err, historyParams, fragmentHistoryParams) {
                if (err)
                    return doCallback(callback, err, null );
                historyParams || (historyParams = {});
                for (var key in passThroughParameters)
                    historyParams[key] = passThroughParameters[key];
                getUrlWithUrlInfo(destPageName, destUrlInfo, destInputs, historyParams, fragmentHistoryParams, context, callback)
            })
        }
        function getPostUrlInternal(destPageName, destInputs, passThroughParameters, fragmentPassthroughParameters, context, callback) {
            urlInfoRepository.getUrlInfo(destPageName, function(err, urlInfo) {
                if (err)
                    return doCallback(callback, err, null );
                getPostUrlWithUrlInfo(destPageName, urlInfo, destInputs, passThroughParameters, fragmentPassthroughParameters, null , context, callback)
            })
        }
        function getPostUrlWithUrlInfo(destPageName, destUrlInfo, destInputs, passThroughParameters, fragmentPassthroughParameters, postPassthroughParameters, context, callback) {
            destInputs = destInputs || null ;
            passThroughParameters = passThroughParameters || null ;
            fragmentPassthroughParameters = fragmentPassthroughParameters || null ;
            urlBuilder.buildUrlWithUrlInfo(destPageName, destUrlInfo, destInputs, passThroughParameters, fragmentPassthroughParameters, postPassthroughParameters, context, function(err, result) {
                if (err)
                    return doCallback(callback, err, null );
                converter && converter.convertFormRequestMetadata && (result = converter.convertFormRequestMetadata(result));
                doCallback(callback, null , result)
            })
        }
        function getPostUrlWithHistoryWithUrlInfo(destPageName, destUrlInfo, destInputs, passThroughParameters, currentPageName, curUrlInfo, currentInputs, extraQueryParams, extraFragmentParams, taskName, context, callback) {
            historyParamProvider.get(currentPageName, curUrlInfo, currentInputs, extraQueryParams, extraFragmentParams, taskName, !0, context, function(err, historyParams, fragmentHistoryParams, postHistoryParams) {
                if (err)
                    return doCallback(callback, err);
                historyParams || (historyParams = {});
                for (var key in passThroughParameters)
                    historyParams[key] = passThroughParameters[key];
                getPostUrlWithUrlInfo(destPageName, destUrlInfo, destInputs, historyParams, fragmentHistoryParams, postHistoryParams, context, callback)
            })
        }
        var di = require("./pub-injection")
          , urlBuilder = di.get("url-builder")
          , historyParamProvider = di.get("history-param-provider")
          , prevUrlProvider = di.get("prev-url-provider")
          , urlInfoRepository = di.get("url-info-repository")
          , converter = di.get("result-converter")
          , PageHistoryParams = di.get("page-history-params");
        module.exports = {
            getUrl: getUrl,
            getUrlWithHistory: getUrlWithHistory,
            getPostUrl: getPostUrl,
            getPostUrlWithHistory: getPostUrlWithHistory,
            getBackUrl: getBackUrl,
            getStartUrl: getStartUrl,
            getStartUrlForTask: getStartUrlForTask
        }
    }
    , {
        "./pub-injection": 16
    }],

    14: [function(require, module) {
        "use strict";
        function get(fallback, taskName, context, callback) {
            var historyId, queryTaskName;
            if (taskName)
                return (historyId = context.getQueryParam(PageHistoryParams.Source),
                historyId || (historyId = context.getQueryParam(PageHistoryParams.Target)),
                !historyId) ? callback(null , fallback ? fallback : null ) : (queryTaskName = context.getQueryParam(PageHistoryParams.StartTask),
                queryTaskName) ? buildUrlFromHistoryId(historyId, fallback, callback) : historyRepo.get(historyId, function(err, historyItem) {
                    if (err || historyItem === null  || !historyItem.Starts || !historyItem.Starts[taskName])
                        return callback(null , fallback ? fallback : null );
                    buildUrlFromHistoryId(historyItem.Starts[taskName], fallback, callback)
                });
            if (historyId = context.getQueryParam(PageHistoryParams.Source),
            historyId)
                return buildUrlFromHistoryId(historyId, fallback, callback);
            if (historyId = context.getQueryParam(PageHistoryParams.Target),
            historyId)
                historyRepo.get(historyId, function(err, historyItem) {
                    if (err || !historyItem.Prev)
                        return callback(null , fallback ? fallback : null );
                    buildUrlFromHistoryId(historyItem.Prev, fallback, callback)
                });
            else
                return callback(null , fallback ? fallback : null )
        }
        function getStarts(context, callback) {
            var historyId = context.getQueryParam(PageHistoryParams.Source), queryTaskName;
            return (historyId || (historyId = context.getQueryParam(PageHistoryParams.Target)),
            !historyId) ? callback(null , {}) : (queryTaskName = context.getQueryParam(PageHistoryParams.StartTask),
            historyRepo.get(historyId, function(err, historyItem) {
                var result, startIds, key, startTaskNames, startTasksDone;
                if (err || historyItem === null  || !(historyItem.Starts || queryTaskName))
                    return callback(null , {});
                result = {};
                startIds = {};
                for (key in historyItem.Starts)
                    startIds[key] = historyItem.Starts[key];
                queryTaskName && (startIds[queryTaskName] = historyId);
                startTaskNames = Object.keys(startIds);
                startTasksDone = 0;
                startTaskNames.forEach(function(taskName) {
                    var startHistoryId = startIds[taskName];
                    buildUrlFromHistoryId(startHistoryId, null , function(err, url) {
                        url !== null  && (startTasksDone++,
                        result[taskName] = url,
                        startTasksDone === startTaskNames.length && callback(null , result))
                    })
                })
            }))
        }
        function buildUrlFromHistoryId(historyId, fallback, callback) {
            historyRepo.get(historyId, function(err, historyItem) {
                if (err || historyItem === null )
                    return callback(null , fallback ? fallback : null );
                var url = historyItem.Url
                  , result = url.replace(regex, function(c) {
                    var prefix = "?"
                      , hookIdx = url.indexOf("?")
                      , hashIdx = url.indexOf("#");
                    return hookIdx != -1 && (hashIdx == -1 || hookIdx < hashIdx) && (prefix = "&"),
                    prefix + PageHistoryParams.Target + "=" + historyId + c
                });
                callback(null , result)
            })
        }
        var di = require("./pub-injection"), PageHistoryParams = di.get("page-history-params"), historyRepo = di.get("history-repository"), urlBuilder = di.get("url-builder"), regex;
        module.exports = {
            getBack: function(fallback, context, callback) {
                get(fallback, null , context, callback)
            },
            getStart: function(fallback, context, callback, taskName) {
                get(fallback, taskName ? taskName : PageHistoryParams.DefaultTask, context, callback)
            },
            getStarts: getStarts
        };
        regex = /(#|$)/
    }
    , {
        "./pub-injection": 16
    }],

    15: [function(require, module) {
        (function(global) {
            "use strict";
            var httpClient = require("./http-client-browser")
              , fileSystem = require("./file-system-browser");
            module.exports = function(injector) {
                injector.register("url-part-types", require("./url-part-types"));
                injector.register("page-history-params", require("./page-history-params"));
                injector.register("result-converter", {});
                injector.register("dom-window", global.window);
                try {
                    injector.register("dom-localstorage", global.window.localStorage)
                } catch (e) {
                    injector.register("dom-localstorage", null )
                }
                injector.register("dom", global.document);
                injector.register("context-provider-browser", require("./context-provider-browser"));
                injector.register("dom-jquery", global.jQuery);
                typeof global.ancestry != "undefined" && "pubUrlInfos" in global.ancestry ? injector.register("url-infos-browser", global.ancestry.pubUrlInfos) : injector.register("url-infos-browser", null );
                typeof global.ancestry != "undefined" && "pubDomainInfo" in global.ancestry ? injector.register("domain-info-browser", global.ancestry.pubDomainInfo) : injector.register("domain-info-browser", null );
                typeof global.ancestry != "undefined" && "pubDevLevel" in global.ancestry ? injector.register("dev-level-browser", global.ancestry.pubDevLevel) : injector.register("dev-level-browser", null );
                typeof global.ancestry != "undefined" && "pubVersion" in global.ancestry ? injector.register("pub-version-browser", global.ancestry.pubVersion) : injector.register("pub-version-browser", 1);
                typeof global.ancestry != "undefined" && "pubPartnerId" in global.ancestry ? injector.register("pub-manual-partner-id", global.ancestry.pubPartnerId) : injector.register("pub-manual-partner-id", null );
                injector.register("http-client", httpClient);
                injector.register("file-system", fileSystem);
                injector.register("dev-level-provider", require("./dev-level-provider-browser"));
                injector.register("domain-info-provider", require("./domain-info-provider-browser"));
                injector.register("domain-provider", require("./domain-provider"));
                injector.register("fallback-banner-browser", require("./storage-fallback-banner-browser"));
                injector.register("cross-domain-storage", require("./cross-domain-storage-browser"));
                injector.register("history-repository", require("./history-repository-browser"));
                injector.register("url-info-repository", require("./url-info-repository-browser"));
                injector.register("url-builder", require("./url-builder"));
                injector.register("prev-url-provider", require("./prev-url-provider-browser"));
                injector.register("history-param-provider", require("./history-param-provider-browser"));
                injector.register("page-url-broker", require("./page-url-broker"));
                injector.register("history-command-scraper", require("./history-command-scraper-browser"));
                injector.register("page-url-broker-wrapper-browser", require("./page-url-broker-wrapper-browser"));
                require("./history-command-scraper-browser")
            }
        }
        ).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {})
    }
    , {
        "./context-provider-browser": 1,
        "./cross-domain-storage-browser": 2,
        "./dev-level-provider-browser": 3,
        "./domain-info-provider-browser": 4,
        "./domain-provider": 5,
        "./file-system-browser": 6,
        "./history-command-scraper-browser": 7,
        "./history-param-provider-browser": 8,
        "./history-repository-browser": 9,
        "./http-client-browser": 10,
        "./page-history-params": 11,
        "./page-url-broker": 13,
        "./page-url-broker-wrapper-browser": 12,
        "./prev-url-provider-browser": 14,
        "./storage-fallback-banner-browser": 18,
        "./url-builder": 19,
        "./url-info-repository-browser": 20,
        "./url-part-types": 21
    }],

    16: [function(require, module) {
        "use strict";
        var registry = {};
        module.exports = {
            register: function(serviceName, service) {
                registry[serviceName] = service
            },
            get: function(serviceName) {
                if (!(serviceName in registry))
                    throw new Error("Dependency not found: " + serviceName);
                return registry[serviceName]
            }
        }
    }
    , {}],

    17: [function(require) {
        (function(global) {
            var di = require("./pub-injection"), pubInternal, pub;
            require("./pub-dependency-setup-browser")(di);
            pubInternal = di.get("page-url-broker");
            pub = di.get("page-url-broker-wrapper-browser");
            typeof global.ancestry == "undefined" && (global.ancestry = {});
            global.ancestry.pubInternal || (global.ancestry.pubInternal = pubInternal);
            global.ancestry.pub || (global.ancestry.pub = pub)
        }
        ).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {})
    }
    , {
        "./pub-dependency-setup-browser": 15,
        "./pub-injection": 16
    }],

    18: [function(require, module) {
        "use strict";
        function prepLocalization() {
            var key;
            if (!resources) {
                resources = localization.en;
                var langAttr = $("html").attr("lang") || $("[lang]").first().attr("lang")
                  , culture = langAttr ? langAttr.toLowerCase() : "en"
                  , lang = langAttr.substring(0, 2);
                if (lang in localization && (resources = localization[lang]),
                culture in localization)
                    for (key in localization[culture])
                        resources[key] = localization[culture][key]
            }
        }
        function showFallbackBannerIfNeeded() {
            cookieIsSet() || $ && $(function() {
                if (prepLocalization(),
                $.fn.alert)
                    $('<p id="localStorageSiteWideAlert">' + resources.message + ' <a href="' + resources.url + '">' + resources.info + "<\/a><\/p>").prependTo($("#BannerRegion").length ? "#BannerRegion" : "body"),
                    $("#localStorageSiteWideAlert").alert({
                        display: "sitewide",
                        closeable: !0,
                        removable: !0,
                        onClose: function() {
                            setCookie()
                        }
                    }).css("z-index", "2");
                else {
                    $('<p id="localStorageSiteWideAlert"><span class="icon iconWarning"><\/span>' + resources.message + ' <a href="' + resources.url + '">' + resources.info + '<\/a><button class="close"><span class="icon iconClose"><\/span><\/button><\/p>').prependTo($("#BannerRegion").length ? "#BannerRegion" : "body");
                    $("#localStorageSiteWideAlert").css({
                        "background-color": "#fff",
                        "font-size": "15px",
                        margin: "10px",
                        border: "3px solid #d58a34",
                        "border-radius": "6px",
                        "box-shadow": "inset 0 2px 8px rgba(0, 0, 0, .2)",
                        color: "#36322d",
                        "margin-top": "10px",
                        padding: "16px 42px 16px 16px",
                        position: "relative",
                        "text-shadow": "none",
                        "-webkit-transform": "rotateX(0)",
                        transform: "rotateX(0)",
                        "-webkit-transform-origin": "top",
                        "transform-origin": "top",
                        "-webkit-transition": "background .2s, margin-bottom .2s, margin-top .4s, opacity .4s, -webkit-transform .3s",
                        transition: "background .2s, margin-bottom .2s, margin-top .4s, opacity .4s, transform .3s",
                        "z-index": "2"
                    }).find("a").css({
                        color: "inherit",
                        "font-size": "inherit",
                        "text-decoration": "underline"
                    }).end().find(".iconWarning").css({
                        color: "#d58a34",
                        "padding-right": "10px"
                    }).end().find(".close").css({
                        "background-color": "transparent",
                        border: "0",
                        color: "#999999",
                        position: "absolute",
                        right: "15px",
                        top: "15px"
                    }).on("click", function() {
                        $("#localStorageSiteWideAlert").html("").remove();
                        setCookie()
                    })
                }
            })
        }
        function cookieIsSet() {
            var cookie = docCookies.getItem(COOKIE_NAME);
            return cookie === COOKIE_VALUE
        }
        function setCookie() {
            var fullDomain = $document.location.hostname
              , parts = fullDomain.split(".")
              , i = parts.length - 1
              , domain = "";
            do
                domain = parts[i] + (domain == "" ? "" : "." + domain),
                i--;
            while (i >= 0 && parts[i + 1].indexOf("ancestry") == -1);docCookies.setItem(COOKIE_NAME, COOKIE_VALUE, COOKIE_TIME, null , domain)
        }
        var di = require("./pub-injection"), $ = di.get("dom-jquery"), $document = di.get("dom"), localization, resources;
        module.exports = {
            showFallbackBannerIfNeeded: showFallbackBannerIfNeeded
        };
        localization = {
            en: {
                message: "It looks like you have local storage disabled. While you'll still be able to use the site, you may notice that pages load more slowly.",
                info: "Fix the issue.",
                url: "http://help.ancestry.com/app/answers/detail/a_id/9355/"
            },
            "en-us": {
                url: "http://help.ancestry.com/app/answers/detail/a_id/9355/"
            },
            "en-ca": {
                url: "http://ancestryca.custhelp.com/app/answers/detail/a_id/9355/"
            },
            "en-gb": {
                url: "http://ancestryuk.custhelp.com/app/answers/detail/a_id/9355/"
            },
            "en-au": {
                url: "http://ancestryau.custhelp.com/app/answers/detail/a_id/9355/"
            },
            es: {
                message: "Parece ser que se ha deshabilitado el almacenamiento local en el explorador. Aunque todavía podrás utilizar el sitio, quizá notarás que las páginas se cargan de forma más lenta.",
                info: "Haz clic aquí para obtener más información.",
                url: "http://ancestrymx.custhelp.com/app/answers/detail/a_id/9360/"
            },
            it: {
                message: "La memorizzazione locale del tuo browser sembra essere disattivata. Potrai comunque utilizzare il sito, ma le pagine potrebbero essere caricate più lentamente",
                info: "Fai clic qui per ulteriori informazioni.",
                url: "http://ancestryit.custhelp.com/app/answers/detail/a_id/9380/"
            },
            fr: {
                message: "Le stockage local de votre navigateur semble être désactivé. Vous pouvez continuer à utiliser le site, mais le chargement des pages peut être ralenti.",
                info: "Cliquez ici pour en savoir plus.",
                url: "http://ancestryfr.custhelp.com/app/answers/detail/a_id/9359/"
            },
            "fr-ca": {
                url: "http://ancestrycafr.custhelp.com/app/answers/detail/a_id/9359/"
            },
            de: {
                message: "Es sieht aus, als ob der lokale Speicher auf Ihrem Browser deaktiviert ist. Sie werden die Website noch verwenden können, merken u. U. aber, dass die Seiten langsamer geladen werden.",
                info: "Klicka här för mer information.",
                url: "http://ancestryde.custhelp.com/app/answers/detail/a_id/9358/"
            },
            sv: {
                message: "Det verkar som att du i webbläsaren har inaktiverat lokal lagring. Du kan fortfarande använda webbplatsen, men det kan ta lång tid att läsa in sidorna.",
                info: "Haz clic aquí para obtener más información.",
                url: "http://ancestryse.custhelp.com/app/answers/detail/a_id/9357/"
            }
        };
        resources = null ;
        var COOKIE_NAME = "hPubSF"
          , COOKIE_VALUE = "t"
          , COOKIE_TIME = 86400
          , docCookies = {
            getItem: function(sKey) {
                return sKey ? decodeURIComponent($document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null  : null 
            },
            setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
                if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey))
                    return !1;
                var sExpires = "";
                if (vEnd)
                    switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString()
                    }
                return $document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : ""),
                !0
            },
            removeItem: function(sKey, sPath, sDomain) {
                return this.hasItem(sKey) ? ($document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : ""),
                !0) : !1
            },
            hasItem: function(sKey) {
                return sKey ? new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test($document.cookie) : !1
            },
            keys: function() {
                for (var aKeys = $document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++)
                    aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
                return aKeys
            }
        }
    }
    , {
        "./pub-injection": 16
    }],

    19: [function(require, module) {
        "use strict";
        function buildUrl(pageName, inputs, passThroughData, fragmentPassThroughData, postPassThrough, context, callback) {
            urlInfoRepository.getUrlInfo(pageName, function(err, destUrlInfo) {
                if (destUrlInfo == null )
                    return callback(null , {});
                buildUrlWithUrlInfo(pageName, destUrlInfo, inputs, passThroughData, fragmentPassThroughData, postPassThrough, context, function(buildErr, result) {
                    return buildErr ? callback(buildErr, null ) : callback(null , result)
                })
            })
        }
        function buildUrlWithUrlInfo(destPageName, urlInfo, inputs, passThroughData, fragmentPassThroughData, postPassThrough, context, callback) {
            if (!callback || typeof callback != "function")
                return callback(new Error("A callback must be provided in buildUrlWithUrlInfo"), null );
            getDomain(urlInfo, context, function(err, domain) {
                var url;
                if (err)
                    return callback(err);
                var missingRequiredInputs = []
                  , pathSegment = buildPathSegment(urlInfo.UriParts, inputs, missingRequiredInputs, domain)
                  , querySegment = buildQuerySegment(urlInfo.QueryParts, inputs, missingRequiredInputs, passThroughData)
                  , fragmentSegment = buildUrlAndQuerySegment(urlInfo.FragmentParts, inputs, missingRequiredInputs, fragmentPassThroughData)
                  , postParameters = setupPostParameters(urlInfo.FormParameters || null , inputs, postPassThrough);
                return missingRequiredInputs.length > 0 ? callback(new Error("Required inputs are missing: " + missingRequiredInputs.join()), null ) : (url = pathSegment,
                querySegment != null  && querySegment.length > 0 && (url += "?" + querySegment),
                fragmentSegment != null  && fragmentSegment.length > 0 && (url += "#" + fragmentSegment),
                callback(null , {
                    Url: url,
                    Parameters: postParameters
                }))
            })
        }
        function getDomain(urlInfo, context, callback) {
            var domainKey = null ;
            if (urlInfo.UriParts != null  && urlInfo.UriParts.forEach(function(urlPart) {
                urlPart.Type == UrlPartTypes.Domain && (domainKey = urlPart.Value)
            }),
            domainKey == null )
                return callback(null , null );
            domainProvider.get(domainKey, context, function(err, domain) {
                if (err)
                    return callback(err);
                callback(null , domain)
            })
        }
        function setupPostParameters(formParameters, inputs, postPassThrough) {
            var result, postParam, formParameter;
            if (!postPassThrough && (!formParameters || !inputs))
                return formParameters;
            if (result = {},
            postPassThrough)
                for (postParam in postPassThrough)
                    result[postParam] = postPassThrough[postParam];
            for (formParameter in formParameters)
                result[formParameter] = cloneObj(formParameters[formParameter]),
                input[formParameter.InputName] && (result[formParameter].Value = input[formParameter.InputName]);
            return result
        }
        function cloneObj(obj) {
            var result = {};
            for (var key in obj)
                result[key] = obj[key];
            return result
        }
        function buildPathSegment(pathParts, inputs, missingRequiredInputs, domain) {
            var url = "";
            return pathParts || (pathParts = []),
            pathParts.forEach(function(part) {
                var partString = getUrlPartString(part, inputs, !0, domain);
                partString !== null  ? url += partString : part.Optional || part.Type !== UrlPartTypes.Input || missingRequiredInputs.push(part.Value)
            }),
            url
        }
        function buildQuerySegment(queryParts, inputs, missingRequiredInputs, passThroughQueryStrings) {
            var url = "", key;
            if (queryParts || (queryParts = []),
            queryParts.forEach(function(part) {
                var partString = getUrlPartString(part, inputs);
                partString !== null  && part.Key !== null  ? (removeKey(passThroughQueryStrings, part.Key),
                url += encodeQuerySubComponent(part.Key) + "=" + encodeQuerySubComponent(partString) + "&") : part.Optional || part.Type !== UrlPartTypes.Input || missingRequiredInputs.push(part.Value)
            }),
            passThroughQueryStrings != null )
                for (key in passThroughQueryStrings)
                    url += encodeQuerySubComponent(key) + "=" + encodeQuerySubComponent(passThroughQueryStrings[key]) + "&";
            return url.length > 0 && (url = url.substring(0, url.length - 1)),
            url
        }
        function buildUrlAndQuerySegment(urlParts, inputs, missingRequiredInputs, passThroughData) {
            var pathParts, queryParts;
            urlParts || (urlParts = []);
            pathParts = [];
            queryParts = [];
            groupParts(urlParts, pathParts, queryParts);
            var path = buildPathSegment(pathParts, inputs, missingRequiredInputs)
              , query = buildQuerySegment(queryParts, inputs, missingRequiredInputs, passThroughData)
              , segment = path;
            return query !== null  && query.length > 0 && (segment += "?" + query),
            segment
        }
        function groupParts(urlParts, pathParts, queryParts) {
            urlParts.forEach(function(part) {
                part.Key == null  ? pathParts.push(part) : queryParts.push(part)
            })
        }
        function removeKey(obj, key) {
            obj != null  && key in obj && delete obj[key]
        }
        function getUrlPartString(urlPart, inputs, isPath, domain) {
            var def = typeof urlPart.Default == "undefined" ? null  : urlPart.Default, inputVal;
            switch (urlPart.Type) {
            case UrlPartTypes.Constant:
                return urlPart.Value;
            case UrlPartTypes.Input:
                return inputVal = getInputValue(urlPart.Value, def, inputs),
                isPath && inputVal !== null  && (inputVal = encodePathSegment(inputVal)),
                inputVal;
            case UrlPartTypes.Domain:
                return domain
            }
            return def
        }
        function getInputValue(urlPartValue, def, inputs) {
            if (inputs && urlPartValue in inputs) {
                var inputVal = inputs[urlPartValue];
                return inputVal === null  || typeof inputVal == "undefined" ? null  : inputVal.toString()
            }
            return def
        }
        function encodePathSegment(seg) {
            for (var c, result = "", i = 0; i < seg.length; ++i)
                c = seg.charAt(i),
                result += pcharsRegex.test(c) ? c : encodeURIComponent(c);
            return result
        }
        function encodeQuerySubComponent(seg) {
            for (var c, result = "", i = 0; i < seg.length; ++i)
                c = seg.charAt(i),
                result += queryComponentRegex.test(c) ? c : encodeURIComponent(c);
            return result
        }
        var di = require("./pub-injection"), urlInfoRepository = di.get("url-info-repository"), domainProvider = di.get("domain-provider"), UrlPartTypes = di.get("url-part-types"), pcharsRegex, queryComponentRegex;
        module.exports = {
            buildUrl: buildUrl,
            buildUrlWithUrlInfo: buildUrlWithUrlInfo
        };
        pcharsRegex = /[a-zA-Z0-9\-._~!$&'()*+,;=:@]/;
        queryComponentRegex = /[a-zA-Z0-9\-._~!$'()*,:@/?]/
    }
    , {
        "./pub-injection": 16
    }],

    20: [function(require, module) {
        "use strict";
        function getUrlInfo(name, callback) {
            if (!(name in urlInfos))
                return callback(new Error('Page Name "' + name + '" not found.'), null );
            callback(null , urlInfos[name])
        }
        function getAllUrlInfos(callback) {
            callback(null , urlInfos)
        }
        var di = require("./pub-injection")
          , urlInfos = di.get("url-infos-browser");
        module.exports = {
            getUrlInfo: getUrlInfo,
            getAllUrlInfos: getAllUrlInfos
        }
    }
    , {
        "./pub-injection": 16
    }],

    21: [function(require, module) {
        "use strict";
        module.exports = {
            Input: "Input",
            Constant: "Constant",
            Domain: "SiteSettings"
        }
    }
    , {}]

}, {}, [17])
