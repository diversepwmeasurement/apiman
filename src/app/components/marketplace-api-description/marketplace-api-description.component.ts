import { Component, Input, OnInit } from '@angular/core';
import { IApiVersion } from '../../interfaces/ICommunication';

@Component({
  selector: 'app-marketplace-api-description',
  templateUrl: './marketplace-api-description.component.html',
  styleUrls: ['./marketplace-api-description.component.scss'],
})
export class MarketplaceApiDescriptionComponent implements OnInit {
  @Input() api!: IApiVersion;
  @Input() isLatest!: boolean;

  features: string[] = ['fast', 'free', 'fancy features'];
  markdown: string =
    '# In inmotae messes et tamen sustinuit fieri\n' +
    '\n' +
    '## Iam nataque prospexit\n' +
    '\n' +
    'Lorem markdownum accingere levatae inspicitur leve Nereides offensa *renidenti\n' +
    'deflent illis* licet operum sonitum descendere multo, errorem nec ille. Monstra\n' +
    'superest, si negat diebus alimenta vibrantia aderas loquendo in nec **bicorni**\n' +
    'advena dixit herosmaxime adpulit arduus dum!\n' +
    '\n' +
    '1. Cristis vetus totumque celeremque creber sacris et\n' +
    '2. Care membra positis centum\n' +
    '3. Sparsitque Bacchus\n' +
    '4. Ausim dixi vittam orbem\n' +
    '5. Tempora pars mutua Oceano soporiferam Iove imis\n' +
    '6. Quem metus\n' +
    '\n' +
    'Se vitae, sede visus illa, virgaque amnis matris protinus parentis se furor\n' +
    'quotiens, tempora. Nec iuro et fieri et flere redit opta arma et quidem\n' +
    '[plurimus](http://negat.org/) cuius. Palustris Bromumque transformat tu virtus\n' +
    'tritumque armat formam iube varias crudelesque dedit. Supplex ipse, omnes neque\n' +
    'Haemoniam ipsoque sanguine mox suppressa montes. Cervos renuente, pavor aere\n' +
    'durat revocata?\n' +
    '\n' +
    '    var ios = -2;\n' +
    '    fileItunesSchema = software;\n' +
    '    cold_meta_wimax += boxExpansion - ribbonWord * version_ripcording_os(\n' +
    '            languageHyperlinkStatus);\n' +
    '\n' +
    '## De pastor natos refluum\n' +
    '\n' +
    'Et ora, est et moderere intra procorum, suam ut instare nam. Obstipuere\n' +
    '**secundi vertice**. Levavit cum molitur caput dederat lumina.\n' +
    '\n' +
    '1. Ibat pependit auguris quid\n' +
    '2. Lupos vietum\n' +
    '3. Rerum sumptis percusso texitur ferrum novitatis quodque\n' +
    '\n' +
    'Producet fluentia prope Titania extenuatur Arethusa corpora *tela geras reddita*\n' +
    'fallaces sola tibi et admonitu, formosior. Suos reduxit *supremo* amicius!\n' +
    '\n' +
    '> Regione magorum iuvenis latosque coeunt: necis enim,\n' +
    '> [Theseu](http://www.exsiccata-vultu.net/) Arethusae vincat *altera carcere*\n' +
    '> vetito tenetque regales, leonem? Praestiteris alas: sagitta satis sua retexit\n' +
    '> restare amore aliquis montesque. Quoque egressa exhalat inque; si Procris?\n' +
    '\n' +
    'Inplevere maior. Ubi aut supplicium Averna, ciet percussis Praebuimus saepe\n' +
    'fugisse quae est: a.';

  constructor() {}

  ngOnInit(): void {}
}
