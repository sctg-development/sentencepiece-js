#include <emscripten/bind.h>
#include <emscripten.h>
#include "../sentencepiece/src/sentencepiece_processor.h"

using namespace emscripten;
using namespace std;
using namespace absl;

class StringView
{
private:
  string str;
  string_view view;

public:
  StringView(const string &input)
  {
    str = string(input);
    view = string_view(str.data(), str.length());
  }
  string_view get_view()
  {
    return this->view;
  }
};

/*
template <typename T>
val vecToIntArray(vector<T> vec)
{
  return val(typed_memory_view(vec.size(), vec.data()));
}

template <typename T>
val vecToStringArray(vector<T> vec)
{
  return val(vec);
}
*/

EMSCRIPTEN_BINDINGS(sentencepiece)
{
  register_vector<string>("VectorString");
  register_vector<int>("VectorInt");

  /*
    emscripten::function("vecToIntArray", select_overload<val(vector<int>)>(&vecToIntArray));
    emscripten::function("vecToStringArray", select_overload<val(vector<string>)>(&vecToStringArray));
  */
  emscripten::function("vecFromJSArray", select_overload<vector<int>(const val &)>(&vecFromJSArray));

  emscripten::class_<sentencepiece::util::Status>("Status")
      .constructor()
      .function("ToString", &sentencepiece::util::Status::ToString);

  emscripten::class_<string_view>("AbslStringView")
      .constructor<const string &>();

  emscripten::class_<StringView>("StringView")
      .constructor<const string &>()
      .function("getView", &StringView::get_view);

  emscripten::class_<sentencepiece::SentencePieceProcessor>("SentencePieceProcessor")
      .smart_ptr_constructor("SentencePieceProcessor", &std::make_shared<sentencepiece::SentencePieceProcessor>)
      .function("Load", emscripten::select_overload<sentencepiece::util::Status(string_view)>(&sentencepiece::SentencePieceProcessor::Load))
      .function("status", &sentencepiece::SentencePieceProcessor::status)
      .function("SetEncodeExtraOptions", &sentencepiece::SentencePieceProcessor::SetEncodeExtraOptions)
      .function("SetDecodeExtraOptions", &sentencepiece::SentencePieceProcessor::SetDecodeExtraOptions)
      .function("SetVocabulary", &sentencepiece::SentencePieceProcessor::SetVocabulary)
      .function("ResetVocabulary", &sentencepiece::SentencePieceProcessor::ResetVocabulary)
      .function("LoadVocabulary", &sentencepiece::SentencePieceProcessor::LoadVocabulary)
      .function("EncodeAsPieces", &sentencepiece::SentencePieceProcessor::EncodeAsPieces)
      .function("EncodeAsIds", &sentencepiece::SentencePieceProcessor::EncodeAsIds)
      .function("PieceToId", &sentencepiece::SentencePieceProcessor::PieceToId)
      .function("DecodeIds", &sentencepiece::SentencePieceProcessor::DecodeIds);
}
